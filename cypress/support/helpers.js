export function randomChar(num) {
    let text = "";
    let possible = "abcdefghijklmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщэюя1234567890";
    for(let i = 0; i < num; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };