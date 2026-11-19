import './styles.css';
import { initAccordion } from './accordion.js';
import { initCourseOffer } from './checkout.js';
import { createModal } from './modal.js';
import { createQuiz } from './quiz.js';

const modalRoot = document.getElementById('quiz-modal');
const screen = modalRoot.querySelector('.phone-screen');
const quizRoot = document.getElementById('quiz');

// FR-8: the quiz markup is born inside #diagnostico and moved into the phone screen on load.
screen.append(quizRoot);
quizRoot.hidden = false;

let quiz;
const modal = createModal(modalRoot, { onOpen: () => quiz.reset() });

quiz = createQuiz(quizRoot, {
  onSeeLessons: () => {
    modal.close();
    const lessons = document.getElementById('aulas');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (lessons) lessons.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  },
});

document.querySelectorAll('[data-open-quiz]').forEach((button) => {
  button.addEventListener('click', () => modal.open());
});

document.querySelectorAll('.accordion').forEach((accordion) => initAccordion(accordion));
initCourseOffer(document.getElementById('course-offer'));
