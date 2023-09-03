export enum AUTH_MESSAGES {
  AUTHENTICATED = 'authenticated',
  LOGOUT = 'logout',
  LOGIN = 'login',
  ONBOARDING_COMPLETE = 'onboarding-complete',
}

export enum NOTIFICATION {
  BREAK = 'break',
}

export enum ACTIONS {
  ACKNOWLEDGE_BREAK = 'acknowledgeBreak',
  CLOSE_BREAK = 'closeBreak',
}

export enum ROUTING {
  OPTIONS_PAGE = 'options-routing',
  POPUP_PAGE = 'popup-routing',
}

type EVENTS = AUTH_MESSAGES | NOTIFICATION | ACTIONS | ROUTING;

export default EVENTS;
