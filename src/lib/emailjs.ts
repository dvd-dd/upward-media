import emailjs from "@emailjs/browser";

// Replace these with your actual EmailJS credentials
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const PUBLIC_KEY = "YOUR_PUBLIC_KEY";

export const sendEmail = async (form: HTMLFormElement) => {
  return emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY);
};
