//FRONT
const socket = io();
let userEmail = '';

async function requestEmail() {
  const { value: email } = await Swal.fire({
    title: 'Enter your mail',
    input: 'text',
    inputLabel: 'Your mail',
    inputValue: '',
    showCancelButton: false,
    inputValidator: (value) => {
      if (!value) {
        return 'You need to write your mail!';
      }
    },
  });

  userEmail = email;
}

requestEmail();

//FRONT EMITE

const chatBox = document.getElementById('chat-box');

chatBox.addEventListener('keyup', ({ key }) => {
  if (key == 'Enter') {
    socket.emit('chat_front_to_back', {
      user: userEmail,
      message: chatBox.value,
    });
    chatBox.value = '';
  }
});

//FRONT RECIBE
socket.on('chat_back_to_front', (messagesChat) => {
  console.log(messagesChat);
  let msgsFormateados = '';
  messagesChat.forEach((message) => {
    msgsFormateados += "<div style='border: 1px solid red;'>";
    msgsFormateados += '<p>' + message.user + '</p>';
    msgsFormateados += '<p>' + message.message + '</p>';
    msgsFormateados += '</div>';
  });
  const divMsgs = document.getElementById('div-messagesChat');
  divMsgs.innerHTML = msgsFormateados;
});
