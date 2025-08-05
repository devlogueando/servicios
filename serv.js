
  // Cierra el menú al hacer clic en un enlace (solo en móvil)
  document.querySelectorAll('.navbar-collapse .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse.classList.contains('show')) {
        new bootstrap.Collapse(navbarCollapse).toggle();
      }
    });
  });
