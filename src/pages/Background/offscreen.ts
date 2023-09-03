export const Offscreen = async () => {
  if (await chrome.offscreen.hasDocument()) return;
  await chrome.offscreen.createDocument(
    {
      url: 'offscreen.html',
      reasons: [chrome.offscreen.Reason.USER_MEDIA],
      justification: 'Play music in background and stream media.',
    },
    () => {
      console.log('audio player created');
    }
  );
};
