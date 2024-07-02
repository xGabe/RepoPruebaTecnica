 [![cypress-logo]] [![javascript-logo]]
## 🧪Repositorio para prueba tecnica

### Como empezar:

1. **Clona el Proyecto**:
    ```
    git clone https://github.com/xGabe/RepoPruebaTecnica.git
    ```

---

2. **Instala todas las dependencias del proyecto (incluyendo Cypress) con npm**:
    ```
    npm install
    ```

---

3. **Para correr las pruebas ejecuta**:
    ```
    npm run
    ```
    - cuyo script es un: ` npx cypress run --browser chrome`, 
      el cual es un atajo, es para que podamos correr las pruebas en modo headless usando el navegador de chrome ya que utilizar otro navegador puede ocacionar que los Assert de las pruebas donde se captura el error en los datos del formulario
      fallen, ya que por la naturaleza del desarollo, los tooltips y sus mensajes son nativos de cada navegador.
      
      -Puedes utilizar también
      ```
      npm run
      ```
      que sirve para ejecutar las pruebas en modo interactivo
---

### 🚩IMPORTANTE

En el repositorio se encontrará un pipeline para correr las pruebas que se ejecuta al hacer push o mergue a master, en el cual las pruebas fallan por lo mensionado anteriormente, se adjunta error obtenido  
![error pipeline](https://github.com/xGabe/RepoPruebaTecnica/assets/117762203/67adae65-c1b1-4a18-96b2-6d0233e8f52a)
En este caso navegador se ejecuta en ingles, por lo tanto los tooltips con los mensajes de error estaran en este idioma, lo cual hara que fallen las comparaciones
