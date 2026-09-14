const projects = [
  { title: 'InsightEdu', type: 'Produto', year: '2024', teamwork: 'Trabalho em equipe', description: 'Sistema web para gestão e acompanhamento de dados escolares, com cadastro de alunos e turmas, gerenciamento de notas, gráficos e relatórios.', github: 'https://github.com/maath01/insightedu', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85', color: 'sage' },
  { title: 'Seletor Adaptativo de Algoritmos', type: 'Web', year: '2024', teamwork: 'Trabalho em equipe', description: 'Sistema que analisa as características de problemas de busca e ordenação, recomenda algoritmos adequados e valida sua eficiência por meio de testes e benchmarks.', github: 'https://github.com/Rozane-Raquel/Projeto-Pesquisa-e-Ordena-o-de-dados', image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=85', color: 'clay' },
  { title: 'Design Patterns em Java', type: 'Experimento', year: '2024', teamwork: 'Trabalho em equipe', description: 'Aplicação prática dos padrões Factory, Decorator e Prototype em Java, utilizando conceitos de Programação Orientada a Objetos.', github: 'https://github.com/Rozane-Raquel/projeto-design-patterns', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=85', color: 'sand' },
  { title: 'To-Do List — POO', type: 'Produto', year: '2024', teamwork: 'Trabalho individual', description: 'Sistema de gerenciamento de tarefas desenvolvido em Java, aplicando conceitos de Programação Orientada a Objetos.', github: 'https://github.com/Rozane-Raquel/projeto-to-do-list-POO', image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=85', color: 'blue' }
];

const grid = document.querySelector('#project-grid');
const buttons = document.querySelectorAll('.filter-button');
const contactForm = document.querySelector('.contact-form');
const formFeedback = document.querySelector('.form-feedback');
const projectDialog = document.querySelector('#project-dialog');
const dialogType = projectDialog.querySelector('.project-dialog-type');
const dialogTitle = projectDialog.querySelector('.project-dialog-title');
const dialogDescription = projectDialog.querySelector('.project-dialog-description');
const dialogGithub = projectDialog.querySelector('.project-dialog-github');

function openProjectDialog(project) {
  dialogType.textContent = `Projeto acadêmico / ${project.teamwork}`;
  dialogTitle.textContent = project.title;
  dialogDescription.textContent = project.description;
  dialogGithub.href = project.github || '#';
  dialogGithub.hidden = !project.github;
  projectDialog.showModal();
}

function renderProjects(filter = 'Todos') {
  const visibleProjects = filter === 'Todos' ? projects : projects.filter((project) => project.type === filter);
  grid.innerHTML = visibleProjects.map((project, index) => `
    <article class="project-card ${project.color}" data-project-title="${project.title}" role="button" tabindex="0" style="--delay: ${index * 70}ms">
      <a class="project-image" href="#project-dialog" data-project-title="${project.title}" aria-label="Conheça o projeto ${project.title}">
        <img src="${project.image}" alt="Imagem de apresentação do projeto ${project.title}" loading="lazy" />
        <span class="project-arrow" aria-hidden="true">↗</span>
      </a>
      <div class="project-meta"><span>${project.teamwork}</span></div>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
    </article>
  `).join('');

  grid.querySelectorAll('.project-card').forEach((projectCard) => {
    const openCard = () => {
      const project = projects.find((item) => item.title === projectCard.dataset.projectTitle);
      openProjectDialog(project);
    };

    projectCard.addEventListener('click', openCard);
    projectCard.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openCard();
      }
    });
    projectCard.querySelector('.project-image').addEventListener('click', (event) => event.preventDefault());
  });
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    buttons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    renderProjects(button.dataset.filter);
  });
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formFeedback.textContent = 'Obrigada pela mensagem! Retorno em breve.';
  contactForm.reset();
});

projectDialog.addEventListener('click', (event) => {
  if (event.target === projectDialog) projectDialog.close();
});

document.querySelectorAll('.skill-toggle').forEach((toggle) => {
  toggle.addEventListener('click', (event) => {
    event.preventDefault();
    const card = toggle.closest('.skill-card');
    const expanded = card.classList.toggle('expanded');

    document.querySelectorAll('.skill-card.expanded').forEach((otherCard) => {
      if (otherCard !== card) {
        otherCard.classList.remove('expanded');
        otherCard.querySelector('.skill-toggle').setAttribute('aria-expanded', 'false');
        otherCard.querySelector('.skill-toggle span').textContent = '⌄';
      }
    });

    toggle.setAttribute('aria-expanded', expanded);
    toggle.querySelector('span').textContent = expanded ? '⌃' : '⌄';
  });
});

renderProjects();
