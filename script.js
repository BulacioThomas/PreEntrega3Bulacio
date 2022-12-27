import usuarios from "./users.json" assert { type: "json" };

const loginForm = document.querySelector("#loginForm");
const loginUsuario = document.querySelector("#loginUsuario");
const loginPassword = document.querySelector("#loginPassword");
const registrarseForm = document.querySelector("#registrarseForm");
const registrarseUsuario = document.querySelector("#registrarseUsuario");
const registrarsePassword = document.querySelector("#registrarsePassword");
const alertsContainer = document.querySelector("#alertsContainer");

const crearAlerta = () => {
	const newAlert = document.createElement("div");

	newAlert.classList.add("alert");
	newAlert.classList.add("d-none");
	newAlert.setAttribute("id", "alert");
	newAlert.setAttribute("role", "alert");
	newAlert.style = "position: fixed; top: 0; right: 0; left: 0";

	alertsContainer.appendChild(newAlert);
};

window.onload = () => {
	crearAlerta();

	if (localStorage.getItem("usuarios") === null) {
		localStorage.setItem("usuarios", JSON.stringify(usuarios));
	}
};

const mostrarAlert = (tipo, texto) => {
	const nuevaAlerta = document.querySelector("#alert");
	nuevaAlerta.innerHTML = texto;
	nuevaAlerta.className = `alert alert-${tipo}`;

	setTimeout(() => {
		nuevaAlerta.classList.add("d-none");
	}, 4000);
};

const iniciarSesion = (e) => {
	e.preventDefault();
	const usuariosBaseDeDatos = JSON.parse(localStorage.getItem("usuarios"));

	if (loginUsuario.value === "" || loginPassword.value === "") {
		mostrarAlert("danger", "El nombre y la contraseña no pueden estar vacíos");
		return;
	}

	const nuevoUsuario = {
		usuario: loginUsuario.value,
		password: loginPassword.value,
	};

	const existeUsuario = usuariosBaseDeDatos.filter(
		(usuario) =>
			usuario.usuario === nuevoUsuario.usuario &&
			usuario.password === nuevoUsuario.password
	);

	if (existeUsuario.length > 0) {
		mostrarAlert("success", "Te has logeado correctamente");
		loginUsuario.value = "";
		loginPassword.value = "";
	} else {
		mostrarAlert("danger", "Usuario o contraseña incorrectos");
	}
};
loginForm.addEventListener("submit", iniciarSesion);

const registrarse = (e) => {
	e.preventDefault();

	if (registrarseUsuario.value === "" || registrarsePassword.value === "") {
		mostrarAlert("danger", "El nombre y la contraseña no pueden estar vacíos");
		return;
	}

	const nuevoUsuario = {
		usuario: registrarseUsuario.value,
		password: registrarsePassword.value,
	};

	const usuariosDB = JSON.parse(localStorage.getItem("usuarios"));
	const usuariosActualizados = [...usuariosDB, nuevoUsuario];
	localStorage.setItem("usuarios", JSON.stringify(usuariosActualizados));

	mostrarAlert("success", "Te has registrado correctamente!");
	registrarseUsuario.value = "";
	registrarsePassword.value = "";
};
registrarseForm.addEventListener("submit", registrarse);
