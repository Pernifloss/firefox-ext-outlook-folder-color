function saveFolderColor(folder, color)
{

	browser.storage.local.get('folders').then(res =>
	{
		var folders = res.folders;
		browser.storage.local.set({
			'folders': folders.includes(folder) ? folders : [...folders, folder],

			[folder]: color
		})

		if (!folders.includes(folder))
		{

			const p = document.createElement('p');
			const input = document.createElement('input');
			input.setAttribute('type', 'button');
			input.setAttribute('value', 'x');
			input.setAttribute('data-id', folder);
			input.addEventListener("click", deleteFolderSub);
			const span = document.createElement('span');
			span.innerHTML = folder;
			span.style.color = color;
			p.append(span);
			p.append(input);
			p.setAttribute('id', 'fol-' + folder);
			document.body.append(p);
		} else
		{

			document.querySelector('#fol-' + folder).style.color = color;
		}

	})
}

function deleteFolder(folder)
{

	browser.storage.local.get('folders').then(res =>
	{
		var foldersStr = res.folders || []
		browser.storage.local.set({
			'folders': foldersStr.filter(e => e !== folder),

		})
		document.querySelector('#fol-' + folder).remove();


	})
}

function saveOptions(e)
{
	e.stopPropagation();
	e.preventDefault();
	const form = e.target;
	const formFields = form.elements;

	const folder = formFields.folder.value;
	const color = formFields.color.value;
	saveFolderColor(folder, color);
}

function deleteFolderSub(e)
{
	e.stopPropagation();
	e.preventDefault();
	const butt = e.target;

	deleteFolder(butt.getAttribute('data-id'))
}

function restoreOptions()
{

	let storageItem = browser.storage.local.get('folders');
	storageItem.then((res) =>
	{
		folders = res.folders
		folders.forEach(e =>
		{

			browser.storage.local.get(e).then((c) =>
			{

				const p = document.createElement('p');
				const input = document.createElement('input');
				input.setAttribute('type', 'button');
				input.setAttribute('value', 'x');
				input.setAttribute('data-id', e);
				input.addEventListener("click", deleteFolderSub);
				const span = document.createElement('span');
				span.innerHTML = e;
				span.style.color = c[e];
				p.append(span);
				p.append(input);
				p.setAttribute('id', 'fol-' + e);
				document.body.append(p);
			})

		})
	});

}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("#folder").addEventListener("click", deleteFolderSub);