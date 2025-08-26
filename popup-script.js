const receipts = [
  "CR-3827146", "CR-9471203", "CR-5623918",
  "CR-1034829", "CR-8742031", "CR-2991846",
  "CR-4719283", "CR-6137284", "CR-3309127", "CR-5841920"
];

let otpTime = 0;
let otpInterval;

function generateCaptcha() {
  let a = Math.floor(Math.random() * 10) + 1;
  let b = Math.floor(Math.random() * 10) + 1;
  document.getElementById('captchaLabel').textContent = `What is ${a} + ${b}?`;
  document.getElementById('captchaInput').dataset.answer = (a + b).toString();
}

generateCaptcha();

document.getElementById('sendCode').addEventListener('click', () => {
  const userAnswer = document.getElementById('captchaInput').value;
  const correctAnswer = document.getElementById('captchaInput').dataset.answer;
  const result = document.getElementById('result');

  if (userAnswer !== correctAnswer) {
    result.textContent = "Wrong CAPTCHA. Try again.";
    result.style.color = "crimson";
    return;
  }

  const otp = Math.floor(Math.random() * 8001) + 1000;
  localStorage.setItem("secureOTP", otp);
  result.textContent = `OTP: ${otp}`;
  result.style.color = "#333";

  otpTime = 30;
  document.getElementById("validateOTP").disabled = false;
  updateTimer();
  clearInterval(otpInterval);
  otpInterval = setInterval(updateTimer, 1000);
});

function updateTimer() {
  const timer = document.getElementById("timerDisplay");
  if (otpTime > 0) {
    timer.textContent = `OTP valid for ${otpTime}s`;
    otpTime--;
  } else {
    clearInterval(otpInterval);
    timer.textContent = "OTP expired";
    document.getElementById("validateOTP").disabled = true;
  }
}

document.getElementById("validateOTP").addEventListener("click", () => {
  const enteredOtp = document.getElementById("otpField").value;
  const savedOtp = localStorage.getItem("secureOTP");
  const result = document.getElementById("result");

  if (enteredOtp === savedOtp && otpTime > 0) {
    result.textContent = "OTP validated";
    result.style.color = "green";
  } else if (otpTime <= 0) {
    result.textContent = "OTP expired";
    result.style.color = "orangered";
  } else {
    result.textContent = "Incorrect OTP";
    result.style.color = "red";
  }
});

document.getElementById("checkReceipt").addEventListener("click", () => {
  const code = document.getElementById("receiptInput").value.trim();
  const result = document.getElementById("result");

  if (receipts.includes(code)) {
    result.textContent = "Receipt verified";
    result.style.color = "green";
  } else {
    result.textContent = "Invalid receipt";
    result.style.color = "crimson";
  }
});

document.getElementById("startScan").addEventListener("click", () => {
  const randomReceipt = receipts[Math.floor(Math.random() * receipts.length)];
  document.getElementById("receiptInput").value = randomReceipt;
  const result = document.getElementById("result");
  result.textContent = `Scanned: ${randomReceipt}`;
  result.style.color = "#23428f";
});
