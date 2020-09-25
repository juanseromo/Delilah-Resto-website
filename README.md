https://juanseromo12.github.io/Delilah-Resto-website/

<h1>Frontend Delilah Development with nodejs, express and pug.</h1>

Este es el proyecto final del curso de DWFS de Acamica, en el cuál se crea una RESTfull API, para el restaurante Delilah Resto. Esta aplicación permite seleccionar el CRUD de productos los cuales son mostrados después en el frontEnd, si un producto o pedido nuevo es agregado será mostrado en su respectivo endpoint.
Aunqué el frontend no era obligatorio preferí hacerlo para entender mucho mejor la unión entre el frontend y backend por medio de nodejs y express.

Para inicializar el servidor se debe instalar la base de datos, la cual se encuentra en la carpeta "models". En el desarrollo se está usando MariaDB y MySql además como elección personal se decidió usar MySqlWorkbench para la creación y uso de la DB, pero puede usar el que mas prefiera. Una vez se haya instalado la DB puede inicializar el servidor desde la terminal usando "mysql.SERVER start".

Después desde su editor de texto preferido puede instalar los diferentes node_modules que se encuentran indicados en el "package.json". Una vez hecho esto comenzar el servidor con "npx nodemon" desde la terminal del proyecto.

En la carpeta del proyecto se encuentran otras carpetas, las cuales contienen archivos públicos para la API, archivos JS con los diferentes endpoints para cada ruta, y las vistas en .PUG que son renderizadas cuando se hacen llamados a diferentes endpoints.

Cada endpoint tiene una linea de comentario explicando su funcionalidad, los cuales también están explicados a continuación:

Routes Folder:

index.js

	/:

		.GET: Renderiza la pagina de de ingreso con usuario y contraseña creada en .PUG
		
	/registro:
		
		.GET: Renderiza la pagina de registro creada con .PUG.
		.POST: Cualquier usuario puede registrar un nuevo usuario en la DB.		
		
login.js

	/login:
	
		.GET: Renderiza una pagina de ingreso con usuario y contraseña creada en .PUG
		.POST: busqueda de usuario y autorización para ingresar al sitio web
	
	/login/bienvenido:
	
		.GET: sitio web de bienvenida cuando ya se ha autorizado el usuario, el cual muestra un menú que lleva a diferentes links.
		
	/login/logout:
	
		.GET: Elimina los diferentes cookies creados para autorización de usuarios por lo que se termina la sesion y lleva al link de inicio.

productos.js

	/productos:
	
		.GET: Cualquier usuario puede tener la lista de todos los productos activos en la base de datos
		.POST: Un usuario autorizado puede insertar un nuevo producto a la DB
		
	/productos/admin:
	
		.GET: La actualización de productos se debe hacer desde POSTMAN ya que no se ha creado el frontend para esta parte.
		
	/productos/updt-prod:
	
		.POST: Usuario autorizado puede actualizar productos ya creados, se debe enviar un body con precio y producto para ser actualizados.
		
	/productos/delete:
		Usuario autorizado puede eliminar productos enviando en POSTMAN un body con el producto a eliminar
		
		
pedidos.js

	/pedidos:
	
		.GET: Redirige al sitio de administración de pedidos
		
	/pedidos/admin
	
		.GET: Solo usuarios autorizados pueden ingresar
		
		.POST: Usuarios autorizados pueden actualizar el estado de los pedidos
		
	/pedidos/nuevo
	
		.GET: Un usuario que ya ha sido logueado, puede comenzar a crear un nuevo PO, en este link ingresa sus datos de contacto.
		
		.POST: guarda un cookie con detalles de contacto del usuario que está creando el pedido.
		
	/pedidos/nuevo/productos
	
		.GET: Muestra la lista de todos los productos activos en la base de datos actualmente, si un producto nuevo fuera agregado se mostraría en esta lista. Además permite seleccionar productos y agregarlos al carrito de compra para después agregarlos al pedido.
		
		.POST: Se agrega el nuevo pedido a la base de datos y se muestra una nueva pagina web con el listado de productos seleccionados y datos de contacto ingresados.
		
	/pedidos/delete
	
		.DELETE: Se puede eliminar un pedido con el ID_PO en el req.body 


	
.