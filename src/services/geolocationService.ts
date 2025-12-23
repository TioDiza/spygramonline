export interface LocationData {
  city: string;
  country: string;
}

// Lista de cidades para usar como "vizinhas" ou fallback
const MOCK_CITIES = [
  'Belo Horizonte', 'Rio de Janeiro', 'São Paulo', 'Salvador', 'Fortaleza',
  'Brasília', 'Curitiba', 'Manaus', 'Recife', 'Porto Alegre', 'Goiânia',
  'Belém', 'São Luís', 'Maceió', 'Campo Grande', 'Teresina', 'João Pessoa',
  'Tiradentes', 'Prados', 'Coronel Xavier Chaves', 'Resende Costa'
];

// Função para embaralhar um array
const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getUserLocation = async (): Promise<LocationData> => {
  try {
    // Usamos uma API simples e sem chave para detectar a localização
    const response = await fetch('http://ip-api.com/json/?fields=city,country');
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }
    const data = await response.json();
    return {
      city: data.city || 'São Paulo', // Cidade padrão em caso de falha
      country: data.country || 'Brazil',
    };
  } catch (error) {
    console.error('Error fetching user location:', error);
    // Retorna um fallback em caso de erro (ex: adblockers podem bloquear a API)
    return { city: 'São Paulo', country: 'Brazil' };
  }
};

export const getNearbyCities = (userCity: string): string[] => {
  const finalCities = [userCity];
  // Filtra a lista de cidades para não repetir a cidade do usuário
  const otherCities = MOCK_CITIES.filter(city => city.toLowerCase() !== userCity.toLowerCase());
  const shuffledCities = shuffleArray(otherCities);
  
  // Pega as 7 primeiras cidades da lista embaralhada
  const citiesToAdd = shuffledCities.slice(0, 7);
  
  // Retorna a lista final (cidade do usuário + 7 outras) embaralhada
  return shuffleArray([...finalCities, ...citiesToAdd]);
};