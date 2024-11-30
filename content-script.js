const passportMap = {
	"a": "а",
	"b": "б",
	"v": "в",
	"g": "г",
	"d": "д",
	"e": "е",
	"": "ё",
	"j": "ж",
	"z": "з",
	"i": "и",
	"q": "й",
	"k": "к",
	"l": "л",
	"m": "м",
	"n": "н",
	"o": "о",
	"p": "п",
	"r": "р",
	"s": "с",
	"t": "т",
	"u": "у",
	"f": "ф",
	"h": "х",
	"": "ц",
	"3": "ч",
	"": "ш",
	"": "щ",
	"": "ъ",
	"": "ы",
	"9": "ь",
	"": "э",
	"": "ю",
	"8": "я",
};
const RuEn = {
	"Й": "Q",
	"Ц": "W",
	"У": "E",
	"К": "R",
	"Е": "T",
	"Н": "Y",
	"Г": "U",
	"Ш": "I",
	"Щ": "O",
	"З": "P",
	"Х": "{",
	"Ъ": "}",
	"Ф": "A",
	"Ы": "S",
	"В": "D",
	"А": "F",
	"П": "G",
	"Р": "H",
	"О": "J",
	"Л": "K",
	"Д": "L",
	"Ж": ":",
	"Э": "\"",
	"Я": "Z",
	"Ч": "X",
	"С": "C",
	"М": "V",
	"И": "B",
	"Т": "N",
	"Ь": "M",
	"Б": "<",
	"Ю": ">",
}
let props = {
	barCodes: {
		passportNational: /^PNRUS([<\d[A-Z]{39})\s*(\d{9})\dRUS\d{6}\d[MF<][\d<O]{7}\d[\d<O]{15}$/,
		passportNationalRu: /^ЗТКГЫ([\dА-Я]{39})\s*(\d{9})\dКГЫ\d{6}\d[ЬАБ][\dБЩ]{7}\d[\dБЩ]{15}$/,
		ozonCodeTemplate: /^\d{8,}\*\d{4}$/,
		ozonBoxCodeTemplate: /^%\d{3}%\d{11}$/,
		ozonSmallCodeTemplate: /^[iI]{2}\d{10}$/,
		ozonSmallCodeRuTemplate: /^[Шш]{2}\d{10}$/,
		ozonLargeCodeTemplate: /^\d{15}$/,
		avitoCodeTemplate: /^\d{10}$/,
		avitoGetTemplate: /^%\d{2}%-\w{2}\d{2}-\d{7}$/,
		avitoGetRuTemplate: /^%\d{2}%-[а-яА-Я]{2}\d{2}-\d{7}$/,
	},
	pageTypes: {
		avito: /^https:\/\/pvz\.avito\.ru\/?(?:\?.*)?$/, // авито - главная
		avitoDeliver: /^https:\/\/pvz\.avito\.ru\/deliver\/?(?:\?.*)?$/, // авито - выдача
		avitoDeliverRefuse: /^https:\/\/pvz\.avito\.ru\/deliver\/parcel\/\d+\/refuse\/barcode\/?(?:\?.*)?$/, // авито - отказ и ввод нового кода
		avitoDeliverCode: /^https:\/\/pvz\.avito\.ru\/deliver\/parcel\/\d+\/?(?:\?.*)?$/, // авито - ввод кода
		avitoDeliverAction: /^https:\/\/pvz\.avito\.ru\/deliver\/.+(?:\?.*)?$/, // авито - в процессе и после выдачи
		avitoAccept: /^https:\/\/pvz\.avito\.ru\/accept\/?(?:\?.*)?$/, // авито - приём посылок от клиентов
		avitoAccept2: /^https:\/\/pvz\.avito\.ru\/accept\/parcel\/\d+\/barcode\/?(?:\?.*)?$/, // авито - приём посылок от клиентов, сканирование нашего кода
		avitoAccept3: /^https:\/\/pvz\.avito\.ru\/accept\/parcel\/(\d+)\/waybill\/?(?:\?.*)?$/, // авито - приём посылок от клиентов, печать накладной
		avitoAcceptCheckDocument: /^https:\/\/pvz\.avito\.ru\/accept\/parcel\/\d+\/check-document\/?(?:\?.*)?$/, // авито - приём посылок от клиентов, ввод паспорта
		avitoAcceptAction: /^https:\/\/pvz\.avito\.ru\/accept\/?(?:\?.*)?$/, // авито - в процессе и после приёма
		avitoGet: /^https:\/\/pvz\.avito\.ru\/get\/?(?:.*)?$/, // авито - приём посылок от курьера
		avitoGive: /^https:\/\/pvz\.avito\.ru\/give\/?(?:\?.*)?$/, // авито - передача посылок курьеру
		avitoInventory: /^https:\/\/pvz\.avito\.ru\/inventory\/?(?:\?.*)?$/, // авито - Заказы в пункте
		avitoShelves: /^https:\/\/pvz\.avito\.ru\/shelves\/?(?:\?.*)?$/, // авито - Управление полками

		ozon: /^https:\/\/turbo-pvz\.ozon\.ru\/?(?:\?.*)?$/, // озон - главная
		ozonOrders: /^https:\/\/turbo-pvz\.ozon\.ru\/orders\/?(?:\?.*)?$/, // озон - выдача <a href="/returns-from-customer/34374314">к возвратам</a>
		ozonOrdersSummary: /^https:\/\/turbo-pvz\.ozon\.ru\/orders\/client-new\/(\d+)\/summary\/?(?:\?.*)?$/, // озон - выдача конкретного заказа, заверщение
		ozonOrdersAction: /^https:\/\/turbo-pvz\.ozon\.ru\/orders\/client-new\/(\d+)\/?(?:\?.*)?$/, // озон - выдача конкретного заказа
		ozonReceive: /^https:\/\/turbo-pvz\.ozon\.ru\/receiving\/receive\/?(?:\?.*)?$/, // озон - приём отправлений
		ozonPostings: /^https:\/\/turbo-pvz\.ozon\.ru\/receiving\/postings\/?(?:\?.*)?$/, // озон - список отправлений
		ozonReturns: /^https:\/\/turbo-pvz\.ozon\.ru\/returns-from-customer\/?(?:\?.*)?$/, // озон - возвраты
		ozonReturnsAction: /^https:\/\/turbo-pvz\.ozon\.ru\/returns-from-customer\/(\d+)\/?(?:\?.*)?$/, // озон - возвраты
		ozonLogin: /^https:\/\/turbo-pvz\.ozon\.ru\/ozonid\/?(?:\?.*)?$/, // озон - вход
		ozonOutbound: /^https:\/\/turbo-pvz\.ozon\.ru\/outbound(?:.*)?$/, // озон - возвраты курьеру
		ozonInventory: /^https:\/\/turbo-pvz\.ozon\.ru\/inventory(?:.*)?$/, // инвентаризация
		ozonSearch: /^https:\/\/turbo-pvz\.ozon\.ru\/search\/?(?:.*)?$/, // поиск
	}
};
let avitoItems = {};
let ozonItems = {};
let ozonCurrentItems = {};
chrome.storage.local.get("props", (result) => {
	props = { ...props, ...result.props };
});

const buffer = {
	timeout: 200,
	hTimeout: null,
	data: "",
	lastUpdate: 0,
	event: null,
	waitOzonOrderCompleteCount: 0,
	send(data) {
		data = data ?? this.data;
		if (!data) {
			return;
		}
		if (data[0] === "%") {
			setTimeout(() => updateOzonInbound(), 2000);
			setTimeout(() => updateOzonInbound(), 10000);
		}
		const element = document.activeElement;
		if (element && element.tagName === "INPUT") {
			element.value = element.value.substring(0, element.selectionStart) + data + element.value.substring(element.selectionEnd);
			element.dispatchEvent(new Event("input", { bubbles: true, cancelable: true }));
		} else if (this.getPageType() === "avitoDeliverCode" && document.activeElement && document.activeElement.tagName !== "INPUT") {
			const elements = document.getElementsByTagName("input");
			if (elements.length === 1) {
				elements[0].focus();
				elements[0].value = data;
				elements[0].dispatchEvent(new Event("input", { bubbles: true, cancelable: true }));
			}
		} else {
			console.log(`send ${data} to window`);
			data.split('').forEach(key => document.dispatchEvent(new KeyboardEvent('keydown', { key })));
		}
	},
	pasteOzonCode(code, retry = 10) {
		const elements = document.querySelectorAll("[data-testid='searchInput']");
		if (elements.length === 1) {
			elements[0].focus();
			elements[0].value = code;
			elements[0].dispatchEvent(new Event("input", { bubbles: true, cancelable: true }));
			setTimeout(() => document.querySelector("[data-testid='searchButton']").click(), this.timeout);
			return true;
		}
		if (retry > 0) {
			setTimeout(() => this.pasteOzonCode(code, retry - 1), this.timeout);
		}
		return false;
	},
	pasteOzonReturnCode(code, retry = 10) {
		const elements = document.querySelectorAll("form input");
		if (elements.length === 1) {
			elements[0].focus();
			elements[0].value = code;
			elements[0].dispatchEvent(new Event("input", { bubbles: true, cancelable: true }));
			setTimeout(() => document.querySelector("form button[type='submit']").click(), this.timeout);
			return true;
		}
		if (retry > 0) {
			setTimeout(() => this.pasteOzonReturnCode(code, retry - 1), this.timeout);
		}
		return false;
	},
	pasteOzonReceiveCode(code, retry = 10) {
		const element = document.querySelector("[class*=_sound] button");
		if (element) {
			code.split('').forEach(key => document.dispatchEvent(new KeyboardEvent('keydown', { key: key })));
			return true;
		}
		if (retry > 0) {
			setTimeout(() => this.pasteOzonReceiveCode(code, retry - 1), this.timeout);
		}
		return false;
	},
	pasteAvitoCode(code, retry = 10) {
		const elements = document.getElementsByTagName("input");
		if (elements.length === 1) {
			elements[0].focus();
			elements[0].value = code;
			elements[0].dispatchEvent(new Event("input", { bubbles: true, cancelable: true }));
			setTimeout(() => document.querySelector("button[type='submit']").click(), this.timeout);
			return true;
		}
		if (retry > 0) {
			setTimeout(() => this.pasteAvitoCode(code, retry - 1), this.timeout);
		}
		return false;
	},
	getCodeInfo() {
		for (let type in props.barCodes) {
			let m = this.data.match(props.barCodes[type]);
			if (m) {
				return { type, code: m[0] };
			}
		}
		return { type: null, code: null };
	},
	getPageType(url = null) {
		url = url || document.location.href;
		for (let key in props.pageTypes) {
			let m = url.match(props.pageTypes[key]);
			if (m) {
				return key;
			}
		}
		return null;
	},
	enterOzonCode(code, pageType) {
		if (pageType === "ozonOrders") {
			this.pasteOzonCode(code);
		} else if (pageType === "ozonReturns") {
			this.pasteOzonReturnCode(code);
		} else {
			chrome.runtime.sendMessage({ code, type: "ozon" });
		}
	},
	enterOzonBoxCode(code, pageType) {
		if (pageType !== "ozonReceive") {
			chrome.runtime.sendMessage({ code, type: "ozon-receive" });
		} else {
			this.send();
		}
	},
	findOzonItem(code, type = "all") {
		if (type === "all" || type === "income") {
			const result = ozonItems.articles?.find((item) => item.barcode === code || item.id == code);
			if (result) {
				return result;
			}
		}
		if (type === "all" || type === "current") {
			const result = ozonCurrentItems.remains?.find((item) => item.barcode === code || item.id == code);
			if (result) {
				return result;
			}
		}
		return null;
	},
	enterOzonItemCode(code, pageType) {
		if (pageType === "ozonOrdersAction") {
			const codes = Array.from(document.querySelectorAll("table tr td:nth-child(2) span")).map(e => e.innerText);
			if (codes.includes(code)) {
				this.send();
			} else {
				chrome.runtime.sendMessage({ code, type: "ozon-receive", sendBack: true });
			}
		} else if (pageType === "ozonReceive") {
			if (this.findOzonItem(code)) {
				this.send();
			} else {
				const data = this.data;
				(new Audio(chrome.runtime.getURL('x.mp3'))).play(); // .then(() => confirm('Возможно это засыл, отправить код на проверку?') && this.send(data));
			}
		} else if (pageType === "ozonOutbound") {
			const item = document.querySelector("div[tabindex] input:not([readonly])");
			console.log(item, code);
			if (item) {
				let x = "";
				code.split("").forEach((symbol) => {
					x += symbol;
					item.value = x;
					item.dispatchEvent(new Event("input", { bubbles: true, cancelable: true }));
				});
			} else {
				this.send();
			}
		} else if (pageType === "ozonInventory" || pageType === "ozonSearch") {
			if (this.findOzonItem(code)) {
				this.send();
			} else {
				(new Audio(chrome.runtime.getURL('x.mp3'))).play();
			}
		} else {
			if (this.findOzonItem(code, "income")) {
				chrome.runtime.sendMessage({ code, type: "ozon-receive" });
			} else if (this.findOzonItem(code, "current")) {
				chrome.runtime.sendMessage({ code, type: "ozon-search" });
			} else {
				(new Audio(chrome.runtime.getURL('x.mp3'))).play();
			}
		}
	},
	findAvitoItemCategory(code) {
		for (let category of avitoItems.categories) {
			for (let item of category.parcels) {
				if (code === item.barcode) {
					return category.category;
				}
			}
		}
		return null;
	},
	enterAvitoCode(code, pageType) {
		if (pageType === "avitoGet") {
			this.pasteAvitoCode(code);
			return;
		}
		const targetCategory = this.findAvitoItemCategory(code);
		if (targetCategory === 'HAND_OVER_TO_CLIENT') { // на выдачу клиенту
			if (pageType === "avitoDeliver") {
				this.pasteAvitoCode(code);
			} else {
				chrome.runtime.sendMessage({ code, type: "avito" });
			}
		} else if (targetCategory === 'HAND_OVER_TO_COURIER') { // передать курьеру
			if (pageType === "avitoGive") {
				this.pasteAvitoCode(code);
			} else {
				chrome.runtime.sendMessage({ code, type: "avito-give" });
			}
		} else {
			if (pageType === "avitoAccept") {
				this.pasteAvitoCode(code);
			} else if (pageType === "avitoAccept2") {
				this.pasteAvitoCode(code);
			} else if (pageType === "avitoDeliverRefuse") {
				this.pasteAvitoCode(code);
			} else {
				chrome.runtime.sendMessage({ code, type: "avito-accept" });
			}
		}
	},
	enterAvitoListCode(code, pageType) {
		if (pageType === "avitoGet") {
			this.pasteAvitoCode(code);
		} else {
			chrome.runtime.sendMessage({ code, type: "avito-get" });
		}
	},
	enterPassportNational(name, number) {
		const nameElement = document.querySelector("form>div:first-child input");
		nameElement.value = name;
		nameElement.dispatchEvent(new Event("input", { bubbles: true, cancelable: true }));
		const numberElement = document.querySelector("form>div:first-child+div input");
		numberElement.value = number;
		numberElement.dispatchEvent(new Event("input", { bubbles: true, cancelable: true }));
		setTimeout(() => document.querySelector("form>div:last-child>div:first-child button").click(), 500);
	},
	checkCode() {
		console.log(this.data);
		let { code, type } = this.getCodeInfo();
		if (!type) {
			return false;
		}
		const pageType = this.getPageType();
		console.log(type, code, pageType);
		if (type === "passportNationalRu") {
			code = code.split("").map(s => s in RuEn ? RuEn[s] : s).join("");
			type = "passportNational";
		}
		if (type === "passportNational") {
			const name = code.substr(5, 39).toLowerCase().replace(/<+/g, " ").split("").map(s => s in passportMap ? passportMap[s] : s).join("").split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
			const number = (code.substr(44, 3) + code.substr(72, 1) + code.substr(47, 6)).replaceAll("O", "0");
			if (document.querySelector("form>div:first-child+div select").value === "PASSPORT") {
				this.enterPassportNational(name, number);
			} else {
				document.querySelector("form>div:first-child+div select").click();
				setTimeout(() => {
					document.querySelector("div[role='listbox']>button").click();
					setTimeout(() => this.enterPassportNational(name, number), 400);
				}, 400);
			}
			console.log(name + "\n" + number);
			return true;
		}
		if (type === "ozonCodeTemplate") {
			this.enterOzonCode(code, pageType);
			return true;
		}
		if (type === "ozonBoxCodeTemplate") {
			this.enterOzonBoxCode(code, pageType);
			return true;
		}
		if (type === "ozonSmallCodeRuTemplate") {
			this.enterOzonItemCode(code.replaceAll("ш", "i").replaceAll("Ш", "i"), pageType);
			return true;
		}
		if (["ozonSmallCodeTemplate", "ozonLargeCodeTemplate"].includes(type)) {
			this.enterOzonItemCode(code, pageType);
			return true;
		}
		if (type === "avitoCodeTemplate") {
			this.enterAvitoCode(code, pageType);
			return true;
		}
		if (type === "avitoGetRuTemplate") {
			code = code.toUpperCase().split("").map(s => s in RuEn ? RuEn[s] : s).join("");
			type = "avitoGetTemplate";
		}
		if (type === "avitoGetTemplate") {
			this.enterAvitoListCode(code, pageType);
			return true;
		}
		alert("O_o");
		return false;
	},
	reset() {
		this.data = "";
		this.lastUpdate = Date.now();
		if (this.hTimeout) {
			clearTimeout(this.hTimeout);
			this.hTimeout = null;
		}
	},
	isEventAccepted() {
		const pageType = this.getPageType();
		const symbol = this.event.key;
		if (!this.event.isTrusted || this.event.ctrlKey || this.event.altKey || ["avitoAcceptCheckDocument"].includes(pageType)) {
			return true;
		}
		if (pageType === "avitoDeliverCode" && symbol === "Enter") {
			setTimeout(() => document.querySelector("div[role=dialog] footer>div>div:first-child button")?.click(), 500);
			return true;
		}
		const element = document.activeElement;
		if (element && element.tagName === "INPUT") {
			if (element.selectionStart !== element.value.length) {
				return true;
			}
		}
		let template = /^[\d\*\%iIшШ-]$/;
		if (this.getPageType() === "avitoAcceptCheckDocument") {
			template = /^[\d\*\%A-Z<А-Я]$/;
		}
		if (this.data.match(/^%\d{2}%-/)) {
			template = /^[\d\*\%\wа-яА-Я-]$/;
		}
		if (symbol.match(template) || symbol === "Enter") {
			return false;
		}
		return true;
	},
	addSymbol(event) {
		this.event = event;
		if (this.isEventAccepted()) {
			return;
		}
		if (['pvz.avito.ru', 'turbo-pvz.ozon.ru'].includes(location.host)) {
			event.stopImmediatePropagation();
			event.preventDefault();
		}
		const symbol = event.key;
		if (symbol === "Enter") {
			this.checkCode();
			return this.reset();
		}
		this.data += symbol;
		if (this.hTimeout) {
			clearTimeout(this.hTimeout);
		}
		this.hTimeout = setTimeout(() => (this.hTimeout = null, this.send(), this.reset()), this.timeout)
	},
	waitOzonOrderComplete() {
		let item = null;
		if (buffer.getPageType() === "ozonOrdersSummary") {
			item = document.querySelector("div[data-testid=giveOutResultSuccessGiveOutInformer] button[type=submit]:first-child");
		}
		this.waitOzonOrderCompleteCount = item ? this.waitOzonOrderCompleteCount + 1 : 0;
		if (this.waitOzonOrderCompleteCount > 1) {
			item.click();
			this.waitOzonOrderCompleteCount = 0;
		}
		setTimeout(() => this.waitOzonOrderComplete(), 30000)
	}
};

document.addEventListener("keydown", (event) => {
	buffer.addSymbol(event);
}, true);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === "code") {
		if (message.type === "ozon") {
			buffer.pasteOzonCode(message.code);
		} else if (message.type === "avito" || message.type === "avito-accept" || message.type === "avito-give" || message.type === "avito-get") {
			buffer.pasteAvitoCode(message.code);
		} else if (message.type === "ozon-receive") {
			buffer.pasteOzonReceiveCode(message.code);
		} else if (message.type === "ozon-search") {
			buffer.pasteOzonReturnCode(message.code);
		}
		sendResponse({ response: "Message received in content script" });
	} else if (message.action === "find-code") {
		const codes = Array.from(document.querySelectorAll("table tr td:nth-child(2) span")).map(e => e.innerText);
		sendResponse({ response: codes.includes(message.code) });
	}
});

function clickDownload(n = 10) {
	if (buffer.getPageType() === "avitoAccept3") {
		document.querySelector("button").click()
	} else if (n > 0) {
		setTimeout(() => clickDownload(), 1000);
	}
}
function addButton() {
	const button = document.createElement("button");
	button.id = "plugin-button";
	button.innerText = "К возвратам";
	button.style.position = "fixed";
	button.style.left = "50%";
	button.style.top = "0";
	button.style.zIndex = "9999";
	button.style.height = "44px";
	button.style.padding = "0 16px";
	button.style.color = "#005bff";
	button.style.border = "none";
	button.style.borderRadius = "8px";
	button.style.cursor = "pointer";
	button.style.fontWeight = "600";
	button.style.fontSize = "15px";
	button.style.fontFamily = "Inter, Arial, Helvetica, sans-serif";
	button.addEventListener("click", () => {
		const pageType = buffer.getPageType();
		if (pageType === "ozonOrdersAction") {
			const m = document.location.href.match(props.pageTypes.ozonOrdersAction);
			if (m) {
				document.location.href = "/returns-from-customer/" + m[1];
			}
		} else if (pageType === "ozonReturnsAction") {
			const m = document.location.href.match(props.pageTypes.ozonReturnsAction);
			if (m) {
				document.location.href = "/orders/client-new/" + m[1];
			}
		}
	});
	document.querySelector("body").after(button);
}

function addAvitoButton() {
	const select = document.createElement("select");
	select.id = "plugin-print";
	select.style.position = "fixed";
	select.style.left = "50%";
	select.style.top = "0";
	select.style.zIndex = "9999";
	select.style.height = "44px";
	select.style.padding = "0 16px";
	select.style.color = "#005bff";
	select.style.border = "none";
	select.style.borderRadius = "8px";
	select.style.cursor = "pointer";
	select.style.fontWeight = "600";
	select.style.fontSize = "15px";
	select.style.fontFamily = "Inter, Arial, Helvetica, sans-serif";
	select.addEventListener("mousedown", async event => {
		const waybills = await chrome.storage.local.get('avitoWaybills') ?? [];
		console.log(waybills);
	});
	const option = document.createElement("option");
	option.value = "";
	option.innerText = "Печать";
	select.appendChild(option);
	select.addEventListener("change", (event) => {
		const pageType = buffer.getPageType();
		console.log(event.target.value);
	});
	document.querySelector("body").after(select);
}

async function main() {
	avitoItems = (await chrome.storage.local.get("avitoItems"))?.avitoItems ?? {};
	ozonItems = (await chrome.storage.local.get("ozonItems"))?.ozonItems ?? {};
	ozonCurrentItems = (await chrome.storage.local.get("ozonCurrentItems"))?.ozonItems ?? {};
	if (location.host === 'pvz.avito.ru') {
		const resp = await fetch("https://pvz.avito.ru/service-abd-oper-facade/web/1/parcels/get-in-point", {
			method: "POST",
			body: JSON.stringify({ pointId: 1449 }),
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		});
		avitoItems = await resp.json();
		await chrome.storage.local.set({ avitoItems });
		addAvitoButton();
	} else if (location.host === 'turbo-pvz.ozon.ru') {
		updateOzonInbound();
		addButton();
		buffer.waitOzonOrderComplete();
	}
	navigation.addEventListener('navigate', (event) => {
		const pageType = buffer.getPageType(event.destination.url);
		if (pageType === "avitoAccept3") {
			const code = event.destination.url.match(props.pageTypes.avitoAccept3);
			if (code) {
				chrome.runtime.sendMessage({ code: code[1], type: "add-avito-waybill" });
			}
		}
		const pluginButton = document.getElementById("plugin-button");
		if (pluginButton) {
			if (pageType === "ozonOrdersAction") {
				pluginButton.style.display = "block";
				pluginButton.innerText = "К возвратам";
			} else if (pageType === "ozonReturnsAction") {
				pluginButton.style.display = "block";
				pluginButton.innerText = "К выдаче";
			} else {
				pluginButton.style.display = "none";
			}
		}
		const pluginPrint = document.getElementById("plugin-print");
		if (pluginPrint) {
			if (pageType === "avito") {
				pluginPrint.style.display = "block";
			} else {
				pluginPrint.style.display = "none";
			}
		}
	});
}

async function ozonRequest(url) {
	const resp = await fetch(url, {
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			"authorization": "Bearer " + JSON.parse(localStorage.getItem("pvz-access-token")).access_token,
			"x-o3-app-name": "turbo-pvz-ui",
			"x-o3-app-version": "release/29503911",
			"x-o3-version-name": "3.1.18",
		},
	});
	return await resp.json();
}

async function updateOzonInbound() {
	ozonItems = await ozonRequest("https://turbo-pvz.ozon.ru/api/inbound/address_storage/pending-articles")
	await chrome.storage.local.set({ ozonItems });
	ozonCurrentItems = await ozonRequest("https://turbo-pvz.ozon.ru/api/reports/agent/warehouse_remainsV2?filter=All&stateFilter=All&postingNumber=&take=1000&skip=0");
	await chrome.storage.local.set({ ozonCurrentItems });
	console.log(ozonItems, ozonCurrentItems);
}

main();

chrome.storage.local.get("props", (result) => {
	props = { ...props, ...result.props };
});