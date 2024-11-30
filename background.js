const urls = [
	"https://pvz.avito.ru", // авито - главная
	"https://pvz.avito.ru/deliver", // авито - выдача
	"https://pvz.avito.ru/deliver/.+", // авито - в процессе и после выдачи
	"https://pvz.avito.ru/accept", // авито - приём посылок от клиентов
	"https://pvz.avito.ru/accept", // авито - в процессе и после приёма
	"https://pvz.avito.ru/get", // авито - приём посылок от курьера
	"https://pvz.avito.ru/give", // авито - передача посылок курьеру
	"https://pvz.avito.ru/inventory", // авито - Заказы в пункте
	"https://pvz.avito.ru/shelves", // авито - Управление полками

	"https://turbo-pvz.ozon.ru", // озон - главная
	"https://turbo-pvz.ozon.ru/orders", // озон - выдача
	"https://turbo-pvz.ozon.ru/orders/client-new/\d+", // озон - выдача конкретного заказа
	"https://turbo-pvz.ozon.ru/receiving/receive", // озон - приём отправлений
	"https://turbo-pvz.ozon.ru/receiving/postings", // озон - список отправлений
	"https://turbo-pvz.ozon.ru/returns-from-customer", // озон - возвраты
];

const barCodes = [
	"\\d{8,}\\*\\d{4}", // озон - код заказа
	"%\\d{3}%\\d{11}", // озон - код ящика
	"ii\\d{10}|\\d{15}", // озон - код заказа
	"\\d{10}", // авито - код заказа
];

const actions = [
	"createPage",
	"updatePage",
];

const pageActions = [
	"none",
	"block",
	"setFocus",
	"sendMessage",
];

const props = {
	avitoIndexUrlTemplate: "^https:\\/\\/pvz\\.avito\\.ru\\/?$",
	avitoUrlTemplate: "^https:\\/\\/pvz\\.avito\\.ru\\/deliver\\/?(?:\\?.*)?$",
	avitoUrlDeliverSuccessTemplate: "^https:\\/\\/pvz\\.avito\\.ru\\/deliver\\/parcel\\/\\d+\\/success\\/?(?:\\?.*)?$",
	avitoAcceptUrlTemplate: "^https:\\/\\/pvz\\.avito\\.ru\\/accept\\/?(?:\\?.*)?$",
	avitoUrlAcceptWaybillTemplate: "^https:\\/\\/pvz\\.avito\\.ru\\/accept\\/parcel\\/\\d+\\/waybill\\/?(?:\\?.*)?$",
	avitoGetUrlTemplate: "^https:\\/\\/pvz\\.avito\\.ru\\/get\\/?(?:\\?.*)?$",
	avitoGiveUrlTemplate: "^https:\\/\\/pvz\\.avito\\.ru\\/give\\/?(?:\\?.*)?$",
	ozonIndexUrlTemplate: "^https:\\/\\/turbo-pvz\\.ozon\\.ru\\/?(?:\\?.*)?$",
	ozonUrlTemplate: "^https:\\/\\/turbo-pvz\\.ozon\\.ru\\/orders\\/?(?:\\?.*)?$",
	ozonUserUrlTemplate: "^https:\\/\\/turbo-pvz\\.ozon\\.ru\\/orders\\/client-new\\/(\\d+)\\/?(?:\\?.*)?$",
	ozonUserSummaryUrlTemplate: "^https:\\/\\/turbo-pvz\\.ozon\\.ru\\/orders\\/client-new\\/(\\d+)\\/summary\\/?(?:\\?.*)?$",
	ozonReturnUrlTemplate: "https:\\/\\/turbo-pvz\\.ozon\\.ru\\/returns-from-customer\\/?(?:\\?.*)?$",
	ozonReceiveUrlTemplate: "https:\\/\\/turbo-pvz.ozon.ru\\/receiving\\/(?:receive|postings)\\/?(?:\\?.*)?$",
	ozonSearchUrlTemplate: "https:\\/\\/turbo-pvz.ozon.ru\\/search(?:.*)?$",
};
chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.local.set({ props: props });
});

const info = {
	ozon: {
		message: null
	},
	ozonReturn: {
		message: null
	},
	ozonReceive: {
		message: null
	},
	ozonSearch: {
		message: null
	},
	avito: {
		message: null
	},
	avitoGive: {
		message: null
	},
	avitoAccept: {
		message: null
	},
	avitoGet: {
		message: null
	}
};

async function main() {
	test(JSON.stringify((await chrome.tabs.query({})).map(tab => tab.url)));
}

function test(message) {
	chrome.notifications.create({
		type: 'basic',
		iconUrl: '/images/info.png',
		title: `Notification title`,
		message: message,
		priority: 1
	});
}

// main();
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	// Проверяем, что статус вкладки стал "complete", что значит завершение загрузки страницы
	if (changeInfo.status === 'complete' && tab.url) {
		if (tab.url === "chrome://newtab/") {
			setTimeout(() => chrome.tabs.update(tab.id, { url: "https://turbo-pvz.ozon.ru/" }), 200);
		} else if (info.ozon.message && tab.url.match(new RegExp(props.ozonUrlTemplate))) {
			chrome.tabs.sendMessage(info.ozon.message.tabId, info.ozon.message.message, (response) => { });
			info.ozon.message = null;
		} else if (info.avito.message && tab.url.match(new RegExp(props.avitoUrlTemplate))) {
			chrome.tabs.sendMessage(info.avito.message.tabId, info.avito.message.message, (response) => { });
			info.avito.message = null;
		} else if (info.ozonReturn.message && tab.url.match(new RegExp(props.ozonReturnUrlTemplate))) {
			chrome.tabs.sendMessage(info.ozonReturn.message.tabId, info.ozonReturn.message.message, (response) => { });
			info.ozonReturn.message = null;
		} else if (info.ozonReceive.message && tab.url.match(new RegExp(props.ozonReceiveUrlTemplate))) {
			chrome.tabs.sendMessage(info.ozonReceive.message.tabId, info.ozonReceive.message.message, (response) => { });
			info.ozonReceive.message = null;
		} else if (info.avitoGive.message && tab.url.match(new RegExp(props.avitoGiveUrlTemplate))) {
			chrome.tabs.sendMessage(info.avitoGive.message.tabId, info.avitoGive.message.message, (response) => { });
			info.avitoGive.message = null;
		} else if (info.avitoAccept.message && tab.url.match(new RegExp(props.avitoAcceptUrlTemplate))) {
			chrome.tabs.sendMessage(info.avitoAccept.message.tabId, info.avitoAccept.message.message, (response) => { });
			info.avitoAccept.message = null;
		} else if (info.avitoGet.message && tab.url.match(new RegExp(props.avitoGetUrlTemplate))) {
			chrome.tabs.sendMessage(info.avitoGet.message.tabId, info.avitoGet.message.message, (response) => { });
			info.avitoGet.message = null;
		}
	}
});

function findTabByTemplate(template, tabs) {
	for (const tab of tabs) {
		if (tab.url.match(template)) {
			return tab.id;
		}
	}
	return null;
}

function findUserTab(code, tabs) {
	code = (+code.substr(0, 8)).toString();
	for (const tab of tabs) {
		const m = tab.url.match(new RegExp(props.ozonUserUrlTemplate));
		if (m && m[1] === code) {
			return tab.id;
		}
	}
	return null;
}

async function findBarCodeInUserTab(code, tabs) {
	const promises = [];
	for (const tab of tabs) {
		const m = tab.url.match(new RegExp(props.ozonUserUrlTemplate));
		if (m) {
			promises.push(new Promise(resolve => chrome.tabs.sendMessage(tab.id, { action: "find-code", code: code }, response => resolve(response.response ? tab.id : null))));
		}
	}
	for (const tabId of await Promise.all(promises)) {
		if (tabId) {
			return tabId;
		}
	}
	return null;
}

async function sendOzonCode(code) {
	const tabs = await chrome.tabs.query({});
	const userTabId = findUserTab(code, tabs);
	if (userTabId) {
		chrome.tabs.update(userTabId, { active: true });
		return;
	}
	let found = false;
	for (const tab of tabs) {
		if (tab.url.match(new RegExp(props.ozonUrlTemplate))) {
			chrome.tabs.update(tab.id, { active: true });
			chrome.tabs.sendMessage(tab.id, { action: "code", code: code, type: "ozon" }, (response) => { });
			found = true;
			break;
		} else if (tab.url.match(new RegExp(props.ozonIndexUrlTemplate))/* || tab.url.match(new RegExp(props.ozonUserSummaryUrlTemplate))*/) {
			chrome.tabs.update(tab.id, { active: true, url: "https://turbo-pvz.ozon.ru/orders" });
			info.ozon.message = { tabId: tab.id, message: { action: "code", code: code, type: "ozon" } };
			found = true;
			break;
		}
	}
	if (!found) {
		chrome.tabs.create({ url: "https://turbo-pvz.ozon.ru/orders", active: true }, (tab) => {
			info.ozon.message = { tabId: tab.id, message: { action: "code", code: code, type: "ozon" } };
		});
	}
}

async function sendOzonReturnCode(code) {
	const tabs = await chrome.tabs.query({});
	let found = false;
	for (const tab of tabs) {
		if (tab.url.match(new RegExp(props.ozonReturnUrlTemplate))) {
			chrome.tabs.update(tab.id, { active: true });
			chrome.tabs.sendMessage(tab.id, { action: "code", code: code, type: "ozon-return" }, (response) => { });
			found = true;
			break;
		}
	}
	if (!found) {
		chrome.tabs.create({ url: "https://turbo-pvz.ozon.ru/returns-from-customer", active: true }, (tab) => {
			info.ozonReturn.message = { tabId: tab.id, message: { action: "code", code: code, type: "ozon-return" } };
		});
	}
}

async function sendOzonReceiveCode(code, senderTab) {
	const tabs = await chrome.tabs.query({});
	let found = false;
	for (const tab of tabs) {
		if (tab.url.match(new RegExp(props.ozonReceiveUrlTemplate))) {
			chrome.tabs.update(tab.id, { active: true });
			chrome.tabs.sendMessage(tab.id, { action: "code", code: code, type: "ozon-receive" }, (response) => { });
			found = true;
			break;
		}
	}
	if (!found) {
		chrome.tabs.create({ url: "https://turbo-pvz.ozon.ru/receiving/receive", active: true }, (tab) => {
			info.ozonReceive.message = { tabId: tab.id, message: { action: "code", code: code, type: "ozon-receive" } };
		});
	}
}

async function sendOzonSearchCode(code) {
	const tabs = await chrome.tabs.query({});
	let found = false;
	for (const tab of tabs) {
		if (tab.url.match(new RegExp(props.ozonSearchUrlTemplate))) {
			chrome.tabs.update(tab.id, { active: true });
			chrome.tabs.sendMessage(tab.id, { action: "code", code: code, type: "ozon-search" }, (response) => { });
			found = true;
			break;
		}
	}
	if (!found) {
		chrome.tabs.create({ url: "https://turbo-pvz.ozon.ru/search", active: true }, (tab) => {
			info.ozonSearch.message = { tabId: tab.id, message: { action: "code", code: code, type: "ozon-search" } };
		});
	}
}

async function sendAvitoCode(code) {
	const tabs = await chrome.tabs.query({});
	const tabId = await findTabByTemplate(new RegExp(`^https:\\/\\/pvz.avito.ru\\/deliver\\/parcel\\/${code}`), tabs);
	if (tabId) {
		chrome.tabs.update(tabId, { active: true });
		return;
	}
	let found = false;
	for (const tab of tabs) {
		if (tab.url.match(new RegExp(props.avitoUrlTemplate))) {
			chrome.tabs.update(tab.id, { active: true });
			chrome.tabs.sendMessage(tab.id, { action: "code", code: code, type: "avito" }, (response) => { });
			found = true;
			break;
		} else if (tab.url.match(new RegExp(props.avitoIndexUrlTemplate)) || tab.url.match(new RegExp(props.avitoUrlDeliverSuccessTemplate)) || tab.url.match(new RegExp(props.avitoUrlAcceptWaybillTemplate))) {
			chrome.tabs.update(tab.id, { active: true, url: "https://pvz.avito.ru/deliver" });
			info.avito.message = { tabId: tab.id, message: { action: "code", code: code, type: "avito" } };
			found = true;
			break;
		}
	}
	if (!found) {
		chrome.tabs.create({ url: "https://pvz.avito.ru/deliver", active: true }, (tab) => {
			info.avito.message = { tabId: tab.id, message: { action: "code", code: code, type: "avito" } };
		});
	}
}

async function sendAvitoGiveCode(code) {
	const tabs = await chrome.tabs.query({});
	let found = false;
	for (const tab of tabs) {
		if (tab.url.match(new RegExp(props.avitoGiveUrlTemplate))) {
			chrome.tabs.update(tab.id, { active: true });
			chrome.tabs.sendMessage(tab.id, { action: "code", code: code, type: "avito-give" }, (response) => { });
			found = true;
			break;
		} else if (tab.url.match(new RegExp(props.avitoIndexUrlTemplate)) || tab.url.match(new RegExp(props.avitoUrlDeliverSuccessTemplate)) || tab.url.match(new RegExp(props.avitoUrlAcceptWaybillTemplate))) {
			chrome.tabs.update(tab.id, { active: true, url: "https://pvz.avito.ru/give" });
			info.avitoGive.message = { tabId: tab.id, message: { action: "code", code: code, type: "avito-give" } };
			found = true;
			break;
		}
	}
	if (!found) {
		chrome.tabs.create({ url: "https://pvz.avito.ru/give", active: true }, (tab) => {
			info.avitoGive.message = { tabId: tab.id, message: { action: "code", code: code, type: "avito-give" } };
		});
	}
}

async function sendAvitoAcceptCode(code) {
	const tabs = await chrome.tabs.query({});
	let found = false;
	for (const tab of tabs) {
		if (tab.url.match(new RegExp(props.avitoAcceptUrlTemplate))) {
			chrome.tabs.update(tab.id, { active: true });
			chrome.tabs.sendMessage(tab.id, { action: "code", code: code, type: "avito-accept" }, (response) => { });
			found = true;
			break;
		} else if (tab.url.match(new RegExp(props.avitoIndexUrlTemplate)) || tab.url.match(new RegExp(props.avitoUrlDeliverSuccessTemplate)) || tab.url.match(new RegExp(props.avitoUrlAcceptWaybillTemplate))) {
			chrome.tabs.update(tab.id, { active: true, url: "https://pvz.avito.ru/accept" });
			info.avitoAccept.message = { tabId: tab.id, message: { action: "code", code: code, type: "avito-accept" } };
			found = true;
			break;
		}
	}
	if (!found) {
		chrome.tabs.create({ url: "https://pvz.avito.ru/accept", active: true }, (tab) => {
			info.avitoAccept.message = { tabId: tab.id, message: { action: "code", code: code, type: "avito-accept" } };
		});
	}
}

async function sendAvitoGetCode(code) {
	const tabs = await chrome.tabs.query({});
	let found = false;
	for (const tab of tabs) {
		if (tab.url.match(new RegExp(props.avitoGetUrlTemplate))) {
			chrome.tabs.update(tab.id, { active: true });
			chrome.tabs.sendMessage(tab.id, { action: "code", code: code, type: "avito-get" }, (response) => { });
			found = true;
			break;
		} else if (tab.url.match(new RegExp(props.avitoIndexUrlTemplate)) || tab.url.match(new RegExp(props.avitoUrlDeliverSuccessTemplate)) || tab.url.match(new RegExp(props.avitoUrlAcceptWaybillTemplate))) {
			chrome.tabs.update(tab.id, { active: true, url: "https://pvz.avito.ru/get" });
			info.avitoGet.message = { tabId: tab.id, message: { action: "code", code: code, type: "avito-get" } };
			found = true;
			break;
		}
	}
	if (!found) {
		chrome.tabs.create({ url: "https://pvz.avito.ru/get", active: true }, (tab) => {
			info.avitoGet.message = { tabId: tab.id, message: { action: "code", code: code, type: "avito-get" } };
		});
	}
}

async function addAvitoWaybill(code) {
	const avitoWaybills = (await chrome.storage.local.get("avitoWaybills"))?.avitoWaybills ?? [];
	if (avitoWaybills.length > 5) {
		avitoWaybills.shift();
	}
	avitoWaybills.push(code);
	await chrome.storage.local.set({ avitoWaybills });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.type === "ozon") {
		sendOzonCode(message.code);
	} else if (message.type === "avito") {
		sendAvitoCode(message.code);
	} else if (message.type === "ozon-return") {
		sendOzonReturnCode(message.code);
	} else if (message.type === "ozon-receive") {
		sendOzonReceiveCode(message.code, sender.tab);
	} else if (message.type === "avito-give") {
		sendAvitoGiveCode(message.code);
	} else if (message.type === "avito-accept") {
		sendAvitoAcceptCode(message.code);
	} else if (message.type === "avito-get") {
		sendAvitoGetCode(message.code);
	} else if (message.type === "ozon-search") {
		sendOzonSearchCode(message.code);
	} else if (message.type === "add-avito-waybill") {
		addAvitoWaybill(message.code);
	}
	return true;
});