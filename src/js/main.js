import Swiper from "swiper";

const Methods = {
	init() {
		Methods.swiper();
		Methods.validateCEP();
		Methods.submitForm();
	},

	swiper() {
		new Swiper(".swiper-container", {
			direction: "horizontal",
			loop: true,
			pagination: {
				el: ".swiper-pagination"
			},
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev"
			}
		});
	},

	validateCEP() {
		document
			.querySelector(".js-search")
			.addEventListener("keyup", ({ currentTarget }) => {
				currentTarget.value = currentTarget.value.replace(/[^0-9\s]/gi, "");
				if (currentTarget.value.length >= 7) {
					const valueFormatted = currentTarget.value.replace(/\D/gi, "");
					currentTarget.value = valueFormatted.replace(
						/\(?(\d{5})\)?[\s]?(\d{2,3})/g,
						"$1-$2"
					);
				}
			});
	},

	submitForm() {
		document.querySelector(".js-form").addEventListener("submit", e => {
			e.preventDefault();
			const value = e.target[0].value.replace(/\D/g, "");
			document.querySelector(".js-form-result").reset();
			document.querySelector(".js-error").classList.remove("is--active");
			if (value.length == 8) {
				Methods.findCEP(value);
			} else {
				document.querySelector(".js-error").classList.add("is--active");
			}
		});
	},

	findCEP(cep) {
		const _url = `https://viacep.com.br/ws/${cep}/json/`;
		const myHeaders = {
			method: "GET",
			mode: "cors"
		};
		fetch(_url, myHeaders)
			.then(response => {
				if (response.status == 200 && response.ok == true) {
					response.json().then(json => {
						if (!("erro" in json)) {
							document.querySelector(".js-address").value = json.logradouro;
							document.querySelector(".js-neighborhood").value = json.bairro;
							document.querySelector(".js-state").value = json.uf;
							document.querySelector(".js-city").value = json.localidade;
						} else {
							document.querySelector(".js-error").classList.add("is--active");
						}
					});
				}
			})
			.catch(err => {
				console.log("Erro ao realizar cadastro" + err.message);
				document.querySelector(".js-error").classList.add("is--active");
			});
	}
};

window.addEventListener("DOMContentLoaded", Methods.init);
