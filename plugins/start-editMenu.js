let handler = async (m, { conn, usedPrefix, command, isAdmin, isOwner, isROwner }) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

let editMenu = global.db.data.chats[m.chat].editMenu
let hasOwnPropertyError = "*No se logró aplicar los cambios*"
  
if (m.isGroup && !isAdmin) {
return conn.reply(m.chat, '*No tiene permitido usar este comando, debe de ser admin*', m)
} else if (!m.isGroup && (!isOwner || !isROwner)) {
return conn.reply(m.chat, '*No tiene permitido usar este comando, no eres dueño de este bot*', m)
}

let seccion = [ 'CONFIGURACIÓN PARA EL MENU COMPLETO' ]
let titulo = [ "EMOJIS", "IMAGEN", "VÍDEO", "PRESENTACIÓN DINÁMICA", "SIMPLE", "MENCIÓN", "TRUNCAR MENÚ", "VERIFICADO", "PERSONALIZAR" ]
let nombre = [ 
`Actualmente: ${editMenu.emoji ? 'activado ✅' : 'desactivado ❌'}`, 
`Actualmente: ${editMenu.imagen ? 'activado ✅' : 'desactivado ❌'}`, 
`Actualmente: ${editMenu.video ? 'activado ✅' : 'desactivado ❌'}`, 
`Actualmente: ${editMenu.dinamico ? 'activado ✅' : 'desactivado ❌'}`, 
`Actualmente: ${editMenu.simple ? 'activado ✅' : 'desactivado ❌'}`, 
`Actualmente: ${editMenu.mencion ? 'activado ✅' : 'desactivado ❌'}`,
`Actualmente: ${editMenu.dividir ? 'activado ✅' : 'desactivado ❌'}`,
`Actualmente: ${editMenu.verificado ? 'activado ✅' : 'desactivado ❌'}`,
`Actualmente: ${editMenu.personalizado ? 'activado ✅' : 'desactivado ❌'}`
]
let descripción = [ 
"Emojis en el menú", 
"Usar sólo imágenes para el menú", 
"Usar sólo vídeos para el menú", 
"Usar Imágenes y Vídeos de forma aleatoria en el menú", 
"Omitir multimedia en el menú", 
"Mencionar al usuario en el menú",
"Usar \"ver más\" despuésde cada sección del menú",
"Aplicar verificado al mensaje del menú",
"Usa esta opción si quieres agregar una imagen personalizada al menú"
]
let comando = [ "editaremoji01", "editarimagen02", "editarvideo03", "editarvi04", "editarsimple05", "editarmencion06", "editardividir07", "editarverificado08", "editarpersonalizado09" ]
const sections = [
{ title: seccion[0], rows: [
{ header: titulo[0], title: nombre[0], description: descripción[0], id: usedPrefix + comando[0] },
{ header: titulo[1], title: nombre[1], description: descripción[1], id: usedPrefix + comando[1] },
{ header: titulo[2], title: nombre[2], description: descripción[2], id: usedPrefix + comando[2] },
{ header: titulo[3], title: nombre[3], description: descripción[3], id: usedPrefix + comando[3] },
{ header: titulo[4], title: nombre[4], description: descripción[4], id: usedPrefix + comando[4] },
{ header: titulo[5], title: nombre[5], description: descripción[5], id: usedPrefix + comando[5] }
]}
]
const list = {
text: `*Editar menú*`,
footer: wm,
buttonText: `AJUSTAR`,
}
await conn.sendList(m.chat, list.text, list.footer, list.buttonText, sections, null, null, fkontak)

if (command === "editaremoji01") {
if (editMenu.hasOwnProperty('emoji')) {
editMenu.emoji = !editMenu.emoji
let mensajeConfirmacion = `Los emojis ahora están ${editMenu.emoji ? 'activados ✅' : 'desactivados ❌'} para el menú completo`
global.db.data.chats[m.chat].editMenu = editMenu
conn.reply(m.chat, mensajeConfirmacion, m)
} else {
return conn.reply(m.chat, hasOwnPropertyError, m)
}}
 
}
handler.command = /^(editarmenu|editmenu|editaremoji01|editarimagen02|editarvideo03|editarvi04|editarsimple05|editarmencion06|editardividir07|editarverificado08|editarpersonalizado09)$/i
export default handler
