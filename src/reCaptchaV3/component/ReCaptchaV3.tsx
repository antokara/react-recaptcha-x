import * as React from 'react';
import { IConsumer } from 'src/provider/IConsumer';
import { IProps } from './IProps';
import { IState } from './IState';

/**
 * a React reCAPTCHA version 3 component
 */
class ReCaptchaV3 extends React.Component<IProps & IConsumer, IState> {
  /**
   * if true, the component is in the process of being unmounted
   */
  private unMounting: boolean = false;

  public constructor(props: IProps & IConsumer) {
    super(props);

    // validate the presence of the siteKeyV3
    const { siteKeyV3 } = this.props.providerContext;
    if (!siteKeyV3) {
      throw new Error(
        'The prop "siteKeyV3" must be set on the ReCaptchaProvider before using the ReCaptchaV3 component'
      );
    }

    this.state = {
      token: undefined,
      retrieving: false
    };
    this.getToken = this.getToken.bind(this);
  }

  public componentDidMount(): void {
    // in case the js api is already loaded, get the token immediately
    this.getToken();
  }

  /**
   * if js api is loaded and was not previously loaded,
   * attempt to get the token
   */
  public componentDidUpdate(prevProps: IProps & IConsumer): void {
    const { loaded } = this.props.providerContext;
    if (prevProps.providerContext.loaded !== loaded && loaded) {
      this.getToken();
    }
  }

  /**
   * does not render anything
   */
  public render(): false {
    return false;
  }

  /**
   * mark our component as being unmounted
   */
  public componentWillUnmount(): void {
    this.unMounting = true;
  }

  /**
   * if the js api is loaded and is not currently retrieving the token.
   * it attempts to retrieve it by
   *  - invoking the callback without an arg, to signify retrieval in progress
   *  - invokes the callback a second time with the token, to signify success and pass the token
   */
  private getToken(): void {
    const { loaded, siteKeyV3 } = this.props.providerContext;
    const { retrieving } = this.state;
    const { action, callback } = this.props;
    if (loaded && !retrieving && siteKeyV3) {
      this.setState(
        {
          token: undefined,
          retrieving: true
        },
        (): void => {
          // invoke callback without args, to signify retrieving in progress
          callback();

          grecaptcha
            .execute(siteKeyV3, { action })
            .then((token: string): void => {
              // do not attempt to set state or invoke the callback
              // if the component is being unmounted
              if (this.unMounting) {
                return;
              }
              this.setState(
                {
                  token,
                  retrieving: false
                },
                (): void => {
                  // invoke callback with token and then refreshToken function,
                  // to signify success and pass the token
                  callback(token, this.getToken);
                }
              );
            });
        }
      );
    }
  }
}

export { ReCaptchaV3, IProps };
