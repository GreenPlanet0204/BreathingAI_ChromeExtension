import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
const Help = () => {
  const { t } = useTranslation('help');
  const [formValue, setFormValue] = useState({
    email: '',
    name: '',
    message: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      name: e.target.value,
    });
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      email: e.target.value,
    });
  };

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormValue({
      ...formValue,
      message: e.target.value,
    });
  };

  return (
    <div className="mx-4 lg:mx-28 mt-8 lg:mt-16">
      <h1 className="text-grey-600 font-bold text-3xl mb-10">{t('title')}</h1>

      <div>
        <p className="text-grey-600 font-bold text-2xl mb-4">
          {t('contact_us')}
        </p>

        <p className="text-grey-600 font-medium text-base mb-4">
          {t('prompt')}
        </p>
        <form onSubmit={handleSubmit} className="my-5">
          <div className="flex flex-col space-y-3 max-w-[630px]">
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formValue?.name || ''}
              onChange={handleNameChange}
              className="w-full text-grey-500 py-3 border border-grey-300 rounded-lg px-3 focus:outline-none focus:ring-grey-500 focus:border-grey-500 hover:shadow"
              placeholder={t('name') || 'Name'}
            />

            <input
              id="email"
              name="email"
              type="email"
              required
              value={formValue?.email || ''}
              onChange={handleEmailChange}
              className="w-full py-3 border border-grey-300 rounded-lg px-3 focus:outline-none focus:ring-grey-500 focus:border-grey-500 hover:shadow"
              placeholder={t('email') || 'Email'}
            />

            <textarea
              name="message"
              required
              value={formValue?.message || ''}
              onChange={handleMessageChange}
              rows={5}
              className="w-full py-3 border border-grey-300 rounded-lg px-3 focus:outline-none focus:ring-grey-500 focus:border-grey-500 hover:shadow"
              placeholder={t('question') || 'What can we help you with?'}
            />

            <div className="flex items-center mb-4 justify-center lg:justify-end">
              <button
                type="submit"
                className="bg-pinky-200 text-base font-bold text-grey-600 rounded-xl px-10 py-3"
              >
                {t('submit')}
              </button>
            </div>
          </div>
        </form>
        <div className="mt-10">
          <div className="text-grey-600 font-bold text-2xl mb-4">
            {t('still_have_questions')}
          </div>
          <div className="text-grey-600 text-base mb-4">
            {t('visit_prompt_line_1')}{' '}
            <a
              href="https://breathing.ai/FAQ"
              target={'_blank'}
              rel="noreferrer"
              className="text-grey-600 font-bold text-base"
            >
              {t('visit_prompt_redirect')}
            </a>
            {t('visit_prompt_line_2')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
