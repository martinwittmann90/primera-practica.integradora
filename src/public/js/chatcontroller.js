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
  let formatMessages = '';
  messagesChat.forEach((message) => {
    formatMessages += "<div style='border: 1px solid red;'>";
    formatMessages += '<p>' + message.user + '</p>';
    formatMessages += '<p>' + message.message + '</p>';
    formatMessages += '</div>';
  });
  const divMsgs = document.getElementById('div-messagesChat');
  divMsgs.innerHTML = formatMessages;
});
