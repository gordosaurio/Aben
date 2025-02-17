README – Instrucciones de Instalación y Ejecución del Proyecto

Copiar el Repositorio
• Clona o descarga este repositorio en tu máquina.

Instalación de Docker y Docker Compose
• Abre una consola y ejecuta el siguiente comando para actualizar los repositorios e instalar Docker y Docker Compose:
 sudo apt update && sudo apt install -y docker.io docker-compose
• Habilita y arranca el servicio de Docker con:
 sudo systemctl enable --now docker

Instalación de PHP y Módulos Requeridos
• Actualiza los repositorios nuevamente:
 sudo apt update
• Instala PHP, el módulo de Apache para PHP y la extensión para MySQL:
 sudo apt install php libapache2-mod-php php-mysql -y

Levantar los Contenedores Docker
• Una vez descargado el proyecto, ábrelo en el IDE de tu preferencia (por ejemplo, Visual Studio Code).
• Dirígete a la carpeta “docker” dentro del proyecto.
• Desde la consola en esa carpeta, ejecuta:
 docker-compose up -d

Verificar Instalación de Docker
• Comprueba que Docker esté instalado correctamente ejecutando:
 docker --version
• Verifica Docker Compose con:
 docker-compose --version

Ejecutar el Back-end
• Abre la carpeta “back” en tu IDE.
• En la consola, inicia el servidor PHP con el siguiente comando:
 php -S localhost:8000 -t public

Ejecutar el Front-end
• Abre la carpeta “front” en tu IDE.
• En la consola, inicia el servidor PHP con el comando:
 php -S localhost:8001

Acceder a la Aplicación
• Abre tu navegador web y dirígete a la siguiente URL:
 http://localhost:8001/pages/index.html
• Podrás ver la construcción del front-end y comenzar a interactuar con la aplicación.

Notas Adicionales
• Asegúrate de que todos los servicios se inicien sin errores.
• Si encuentras problemas, revisa los mensajes de error en la consola para identificar y solucionar inconvenientes.

Con estos pasos, tendrás el entorno de desarrollo configurado y listo para usar.