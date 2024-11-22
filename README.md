# Projeto de Localização e Marcadores

Este projeto é uma aplicação mobile desenvolvida com React Native, que permite aos usuários interagir com um mapa, adicionar marcadores com informações personalizadas, editá-los e excluí-los. A aplicação também inclui gerenciamento de estado e persistência dos dados no dispositivo usando AsyncStorage.


## Recursos Principais

* Exibição de mapa utilizando a biblioteca react-native-maps.
* Adição de marcadores com título, descrição e localização (latitude e longitude).
* Edição de marcadores diretamente no mapa.
* Exclusão de marcadores individuais.
* Persistência dos dados utilizando AsyncStorage.
* Suporte à localização atual do dispositivo com expo-location.
* Interface moderna utilizando react-native-paper para AppBar e botões.


## Instalação

1. Clone o repositório:
```bash
   git clone https://github.com/Markos-Vini/mapMark.git
   cd mapMark
```

2. Instale as dependências do projeto: Certifique-se de ter o Node.js e o Expo CLI instalados na máquina.
```bash
   npm install
```

3. Inicie o projeto:
```bash
   nexpo start
```

## Configuração

Certifique-se de que as seguintes bibliotecas estão instaladas e configuradas corretamente:

### Dependências Principais
* #### React Native e Expo

* Framework para desenvolvimento mobile.
```bash
   npm install react-native react-native-maps expo
```
* Gerenciamento de localização:
```bash
   npm install expo-location
```
* Persistência de dados:
```bash
   npm install @react-native-async-storage/async-storage
```
* Interface e ícones:
```bash
   npm install react-native-paper @expo/vector-icons
```
* Navegação:
```bash
   npm install @react-navigation/native react-native-screens react-native-gesture-handler react-native-safe-area-context react-native-reanimated react-native-get-random-values react-native-vector-icons
```

## Funcionalidades

### 1. Tela Home
* Exibe a lista de marcadores salvos com título, descrição, latitude  e longitude.
* Botão flutuante para adicionar novos marcadores.
* A AppBar contém um botão para logout.

### 2. Tela de Localização
* Mostra um mapa interativo com a posição atual do usuário.
* Permite: 
   * Adicionar: Pressionar no mapa abre um modal para preencher título e descrição.
   * Editar: Clicar em um marcador existente abre o modal para atualizar informações.
   * Excluir: Um botão na lista ou ao editar remove o marcador.
   * Mover: Arrastar o marcador para reposicioná-lo.

### 3. Persistência de Dados

Os marcadores adicionados são armazenados localmente no dispositivo com AsyncStorage, garantindo que eles estejam disponíveis mesmo após o fechamento do aplicativo.


## Como Usar

### Adicionar um Marcador
1. Clique no botão "+" na tela principal.
2. No mapa, pressione em uma localização para abrir o modal.
3. Preencha o título e a descrição e clique em "Salvar".

### Editar um Marcador
1. Clique em um marcador no mapa.
2. Atualize as informações no modal e clique em "Salvar".

### Excluir um Marcador
1. Clique no botão de lixeira ao lado do marcador na lista ou no modal de edição.


## Dependências Utilizadas

* React Native
* Expo
* react-native-maps
* expo-location
* react-native-paper
* AsyncStorage
