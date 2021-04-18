const boy__next__btn = document.querySelector("#boy__next__btn");
const girl__back__btn = document.querySelector("#girl__back__btn");
const heart__back__btn = document.querySelector("#heart__back__btn");
const submit__btn = document.querySelector("#submit__btn");
const girl__container = document.querySelector("#girl__container");
const boy__container = document.querySelector("#boy__container");
const calculation__container = document.querySelector(
	"#calculation__container"
);
const boy__name__input = document.querySelector("#boy__name__input");
const girl__name__input = document.querySelector("#girl__name__input");
const cal__res = document.querySelector("#cal__res");
const boy__name__res = document.querySelector("#boy__name__res");
const girl__name__res = document.querySelector("#girl__name__res");

const checkError = (bname, gname) => {
	if (bname === "" || gname === "") {
		return true;
	} else {
		return false;
	}
};

const calculateLove = async (bname, gname) => {
	const res = fetch(
		`https://love-calculator.p.rapidapi.com/getPercentage?fname=${bname}&sname=${gname}`,
		{
			method: "GET",
			headers: {
				"x-rapidapi-key": "727bc25286msh5e1d7778bc63023p1e734cjsn8233a50866bd",
				"x-rapidapi-host": "love-calculator.p.rapidapi.com",
			},
		}
	)
  .then(function(response) {
    return response.json();
  }).then(function(data) {
    return data;
  })
	.catch((err) => {
		console.error(err);
	});

	return res;
};

boy__next__btn.addEventListener("click", () => {
	girl__container.style.width = "100%";
	boy__container.style.width = "0%";
	calculation__container.style.width = "0%";
});

girl__back__btn.addEventListener("click", () => {
	girl__container.style.width = "0%";
	calculation__container.style.width = "0%";
	boy__container.style.width = "100%";
});

submit__btn.addEventListener("click", () => {
	const validationRes = checkError(
		boy__name__input.value,
		girl__name__input.value
	);

	if (validationRes === true) {
		alert("Enter a valid name");
		return false;
	} else {
		// Success
    calculateLove(boy__name__input.value, girl__name__input.value)
    .then(function(data) {
    	cal__res.innerHTML = `${data.percentage}%`;
    	boy__name__res.innerHTML = `${data.fname}`;
    	girl__name__res.innerHTML = `${data.sname}`;
  	  console.log(data);
  	  girl__container.style.width = "0%";
			boy__container.style.width = "0%";
			calculation__container.style.width = "100%";
	  })
		.catch((err) => {
			console.error(err);
		});
    console.log("Success");
	}
});

heart__back__btn.addEventListener("click", () => {
	girl__container.style.width = "100%";
	boy__container.style.width = "0%";
	calculation__container.style.width = "0%";
});
