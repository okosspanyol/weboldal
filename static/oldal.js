// Az élő oldal egyetlen szkriptje (a Svelte nem töltődik le): mobil menü, fejléc árnyék, videó indítása.
(() => {
	const fejlec = document.querySelector('[data-fejlec]');
	const gomb = document.querySelector('[data-menugomb]');
	const menu = document.getElementById('mobilmenu');

	if (fejlec) {
		const gorgetes = () => fejlec.classList.toggle('gorgetett', window.scrollY > 8);
		addEventListener('scroll', gorgetes, { passive: true });
		gorgetes();
	}

	if (gomb && menu) {
		const felirat = gomb.querySelector('[data-nyit]');
		const vonalak = gomb.querySelector('.vonalak');
		const allit = (nyitva) => {
			gomb.setAttribute('aria-expanded', String(nyitva));
			menu.hidden = !nyitva;
			menu.classList.toggle('nyitva', nyitva);
			vonalak?.classList.toggle('nyitva', nyitva);
			if (felirat) felirat.textContent = felirat.dataset[nyitva ? 'zar' : 'nyit'];
		};
		gomb.addEventListener('click', () => allit(menu.hidden));
		menu.addEventListener('click', (e) => e.target.closest('a') && allit(false));
		addEventListener('keydown', (e) => e.key === 'Escape' && allit(false));
	}

	// Videó: kattintásra cseréli az előnézeti képet a YouTube lejátszóra (addig a YouTube semmit nem tölt be).
	document.addEventListener('click', (e) => {
		const indito = e.target.closest('[data-video]');
		if (!indito) return;
		e.preventDefault();
		const iframe = document.createElement('iframe');
		iframe.src = indito.dataset.video;
		iframe.title = indito.dataset.cim || 'Videó';
		iframe.allow =
			'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
		iframe.referrerPolicy = 'strict-origin-when-cross-origin';
		iframe.allowFullscreen = true;
		for (const cls of indito.classList) if (cls.startsWith('svelte-')) iframe.classList.add(cls);
		indito.replaceWith(iframe);
	});
})();
