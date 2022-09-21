import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";  
import { getFirestore, getDocs, addDoc, collection } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCJmZI0hY7KUk6oshVw5MfBHE9aFkGblM0",
    authDomain: "caopanheiro.firebaseapp.com",
    projectId: "caopanheiro",
    storageBucket: "caopanheiro.appspot.com",
    messagingSenderId: "674209979749",
    appId: "1:674209979749:web:9f9510e129502cd49c958c",
    measurementId: "G-MVCFEG8SE3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

const form = document.getElementById('form');
form.addEventListener('submit', (e)=>{
    e.preventDefault();
})

const submit = document.getElementById('btn-form-submit');
submit.addEventListener('click', async ()=>{
   await addMessage();
})

async function addMessage(){
    const nome = document.getElementById('name');
    const email = document.getElementById('email');
    const assunto = document.getElementById('subject');
    const mensagem = document.getElementById('message');

    try {
        if(!nome || !email || !assunto || !mensagem){
            throw new Error('Todos os campos não foram preenchidos')
        }

        const message = filterMessage({ nome, email, assunto, mensagem });
        const docRef = await addDoc(collection(db, "Mensagens"), message);

        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error(e.message);
    } finally {
        cleanInputs({ nome, email, assunto, mensagem });
    }
}

function filterMessage({nome, email, assunto, mensagem}) {
    return {
        nome: nome.value.trim(),
        email: email.value.trim(),
        assunto: assunto.value.trim(),
        mensagem: mensagem.value.trim()
    }
}

function cleanInputs ({nome, email, assunto, mensagem}) {
    nome.value = '';
    email.value = '';
    mensagem.value = '';
    assunto.value = '';
}