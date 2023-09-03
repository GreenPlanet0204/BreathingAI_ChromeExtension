// import EVENTS from './events';

// class EventBus {
//   static publish(publishedEvent: EVENTS, payload: { [key: string]: any }) {
//     chrome.runtime.sendMessage(chrome.runtime.id, { publishedEvent, payload });
//   }

//   static subscribe(
//     subscribedEvent: EVENTS,
//     cb: (payload: { [key: string]: any }) => void
//   ) {
//     chrome.runtime.onMessage.addListener((event) => {
//       if (subscribedEvent === event.event) {
//         cb(event.payload);
//       }
//     });
//   }
// }

// export default EventBus;
