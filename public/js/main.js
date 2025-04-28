document.addEventListener('DOMContentLoaded', function() {
    // Auto-fade alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    
    if (alerts.length > 0) {
      setTimeout(function() {
        alerts.forEach(function(alert) {
          alert.style.opacity = '0';
          alert.style.transition = 'opacity 0.5s ease';
          
          setTimeout(function() {
            alert.style.display = 'none';
          }, 500);
        });
      }, 5000);
    }
    
    // Format dates in a more readable way
    const formatDate = function(dateElement) {
      if (!dateElement) return;
      
      const date = new Date(dateElement.textContent.replace('Due: ', ''));
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      dateElement.textContent = 'Due: ' + date.toLocaleDateString(undefined, options);
    };
    
    // Format all dates in task cards
    const taskDueDates = document.querySelectorAll('.task-due');
    taskDueDates.forEach(formatDate);
  });