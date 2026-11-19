import './styles.css';
import { PRIVACY_CONTACT_EMAIL } from './config.js';
import { PRIVACY_COPY } from './quiz-data.js';

const root = document.getElementById('privacy');

if (root) {
  const fragment = document.createDocumentFragment();

  const title = document.createElement('h1');
  title.className = 'privacy-title';
  title.textContent = PRIVACY_COPY.title;

  const intro = document.createElement('p');
  intro.className = 'privacy-intro';
  intro.textContent = PRIVACY_COPY.intro;

  fragment.append(title, intro);

  const sections = [
    ...PRIVACY_COPY.sections,
    { title: PRIVACY_COPY.rightsTitle, body: PRIVACY_COPY.rights(PRIVACY_CONTACT_EMAIL) },
  ];

  for (const section of sections) {
    const block = document.createElement('section');
    block.className = 'privacy-section';

    const heading = document.createElement('h2');
    heading.textContent = section.title;

    const body = document.createElement('p');
    body.textContent = section.body;

    block.append(heading, body);
    fragment.append(block);
  }

  const back = document.createElement('a');
  back.className = 'btn btn-ghost privacy-back';
  back.href = 'index.html';
  back.textContent = PRIVACY_COPY.back;
  fragment.append(back);

  root.append(fragment);
}
