export const removeSpecialChars = (text: string): string => {
    // Define a expressão regular para os caracteres "(" , ")" e "-"
    const regex = /[()\-|\s]/g;
    // Substitui os caracteres encontrados por uma string vazia
    return text.replace(regex, '');
};

export const truncateText = (text: string, maxLength:number) => {
    if(text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };