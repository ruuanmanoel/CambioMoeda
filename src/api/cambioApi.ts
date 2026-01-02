import axios from "axios";

// function to get currency pair conversion
async function getPairConversion(
  moedaDe: string,
  moedaPara: string,
  quantidade: number
): Promise<{ valorMoedaConvertida: number; valorTotal: number }> {
  // Format quantity to two decimal places with comma as decimal separator
  const quantidadeFormatada = quantidade.toFixed(2).replace(",", ".");
  // Get API key from environment variables
  const apiKey = process.env.API_KEY;
  console.log(`apiKey : ${apiKey}`);
  // Construct the API URL
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${moedaDe}/${moedaPara}/${quantidadeFormatada}`;

  // Make the API request
  const { data } = await axios.get(url);
  // Check if the response indicates success
  if (data.result !== "success") {
    throw new Error("Erro ao consultar a API de câmbio");
  }

  // Extract conversion rate and result from the response data
  const {
    conversion_rate: valorMoedaConvertida,
    conversion_result: valorTotal,
  } = data;

  console.log(`Valor da moeda convertida: ${data.conversion_rate}`);
  // Return the conversion values
  return {
    valorMoedaConvertida,
    valorTotal,
  };
}

// function to get supported currency codes
async function getSupportedCodes(): Promise<string[]> {
  // Get API key from environment variables
  const apiKey = process.env.API_KEY;
  // Construct the API URL
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/codes`;
  // Make the API request
  const { data } = await axios.get(url);
  // Check if the response indicates success
  if (data.result !== "success") {
    throw new Error("Erro ao consultar a API de câmbio");
  }
  // Extract supported codes from the response data
  const supportedCodes: string[] = data.supported_codes.map(
    (codePair: [string, string]) => {
      return {
        codes: codePair[0],
        name: codePair[1],
      };
    }
  );

  // Return the list of supported currency codes
  return supportedCodes;
}
export { getPairConversion, getSupportedCodes };
