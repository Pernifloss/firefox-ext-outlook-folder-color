let elementNodeListOf = document.querySelectorAll(".gtcPn");

const color = ()=>{
	setTimeout(t,2000);

}
const t = ()=>{
	let storageItem = browser.storage.local.get('folders');
	storageItem.then((res) => {
		var folders = res.folders
		document.querySelectorAll(".gtcPn").forEach(e=>{
			let folderName = e.innerHTML;
			if(folders.includes(folderName)){
				browser.storage.local.get(folderName).then((c)=>{

					e.style.color=c[folderName];
				})
			}
		})
	});

		color()
}
t();