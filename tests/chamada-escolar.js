const { Builder, By, Key } = require("selenium-webdriver")

async function runTest(){

    async function uploadImage(driver, fileInputId, imagePath) {
        const fileInput = await driver.findElement(By.id(fileInputId));
        const absolutePath = path.resolve(imagePath);
    
        fileInput.sendKeys(absolutePath);
    }

    async function selectOptionWithAjax(driver, selectId, optionText) {
        const selectElement = await driver.findElement(By.id(selectId));
        await selectElement.click();

        await driver.findElement(By.id("modalidade-serie-aluno")).sendKeys(optionText)
    }
    
    let driver = await new Builder().forBrowser("firefox").build();


    await driver.get("http://localhost:8000/cadastro/infantil/")

    //responsável
    await driver.findElement(By.id("nome_responsavel")).sendKeys("test");
    await driver.findElement(By.id("cpf_responsavel")).sendKeys("24089086043");
    await driver.findElement(By.id("qtd-dependentes-responsavel")).sendKeys("0");
    await driver.findElement(By.id("auxilio-brasil")).sendKeys("NÃO");

    //contato
    await driver.findElement(By.id("email")).sendKeys("teste@teste.com");
    await driver.findElement(By.id("telefone-principal")).sendKeys("24999995555");
    await driver.findElement(By.id("telefone-celular")).sendKeys("24999995555");

    //endereço
    await driver.findElement(By.id("endereco-tipo")).sendKeys("Residência");
    await driver.findElement(By.id("endereco-cidade")).sendKeys("VOLTA REDONDA");
    await driver.findElement(By.id("endereco-cep")).sendKeys("27213200");
    await driver.findElement(By.id("endereco-numero")).sendKeys("5");
    await driver.findElement(By.id("endereco-bairro")).sendKeys("Aterrado");

    //candidato

    await driver.findElement(By.id("nome-aluno")).sendKeys("xsxs");
    await driver.findElement(By.id("sexo-aluno")).sendKeys("Masculino");
    await driver.findElement(By.id("cpf_candidato")).sendKeys("03589112069");
    await driver.findElement(By.id("data-nascimento-aluno")).sendKeys("25/02/2023");
    await driver.findElement(By.id("necessidade-especial-aluno")).sendKeys("TRANSTORNO DO ESPECTRO AUTISTA");
    await selectOptionWithAjax(driver, "modalidade-serie-aluno", "MATERNAL II - CRECHE");



    await uploadImage(driver, "documento-certidao-nascimento", 'public/img/a.png');
    await uploadImage(driver, "documento-identidade", 'public/img/a.png');
    await uploadImage(driver, "comprovante-endereco-residencia", 'public/img/a.png');

    // const enviar = await driver.findElement(By.id("enviarbtn"));
    // await driver.executeScript("arguments[0].scrollIntoView(true);", enviar);
    //  await driver.sleep(500);
    // await enviar.click();
}

runTest();