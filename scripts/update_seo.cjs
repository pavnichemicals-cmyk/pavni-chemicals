const fs = require('fs');

function updateProductDetailHcl() {
    let html = fs.readFileSync('product-detail-hcl.html', 'utf8');
    const oldHeadPart = html.substring(html.indexOf('<title>'), html.indexOf('<link rel="stylesheet" href="css/base.css">'));
    const newHeadPart = `<title>Hydrochloric Acid (HCl 30-33%) Supplier Gujarat | Bulk Tankers | Pavni Chemicals</title>
    <meta name="description" content="Commercial & industrial grade Hydrochloric Acid (HCl 30-33%) supplier in Gujarat. Authorized dealer for Grasim & Epigral. Bulk rubber-lined road tanker delivery to Dahej, Ankleshwar, Vadodara.">
    <meta name="keywords" content="hydrochloric acid supplier gujarat, hcl 30-33 bulk tanker dahej, industrial hcl ankleshwar, grasim hcl dealer, epigral hydrochloric acid">
    <link rel="canonical" href="https://www.pavnichemicals.com/product-detail-hcl" />
    <meta name="geo.region" content="IN-GJ" />
    <meta name="geo.placename" content="Ankleshwar, Gujarat, India" />
    <meta name="geo.position" content="21.6270;73.0024" />
    <meta name="ICBM" content="21.6270, 73.0024" />
    `;
    html = html.replace(oldHeadPart, newHeadPart);
    fs.writeFileSync('product-detail-hcl.html', html, 'utf8');
    console.log('product-detail-hcl.html updated');
}

function updateProductDetailH2o2() {
    let html = fs.readFileSync('product-detail-h2o2.html', 'utf8');
    const oldHeadPart = html.substring(html.indexOf('<title>'), html.indexOf('<link rel="stylesheet" href="css/base.css">'));
    const newHeadPart = `<title>Hydrogen Peroxide 50% Supplier Gujarat | Pavni Chemicals (Grasim & Epigral Dealer)</title>
    <meta name="description" content="Industrial Hydrogen Peroxide (H2O2 35% & 50%) supplier in Gujarat. Authorized channel partner for Grasim & Epigral. Bulk carboy & tanker delivery for textiles, paper & water treatment.">
    <meta name="keywords" content="hydrogen peroxide supplier gujarat, h2o2 50 percent ankleshwar, textile bleaching chemical gujarat, grasim hydrogen peroxide">
    <link rel="canonical" href="https://www.pavnichemicals.com/product-detail-h2o2" />
    <meta name="geo.region" content="IN-GJ" />
    <meta name="geo.placename" content="Ankleshwar, Gujarat, India" />
    <meta name="geo.position" content="21.6270;73.0024" />
    <meta name="ICBM" content="21.6270, 73.0024" />
    `;
    html = html.replace(oldHeadPart, newHeadPart);
    fs.writeFileSync('product-detail-h2o2.html', html, 'utf8');
    console.log('product-detail-h2o2.html updated');
}

function updateProductDetailGeneric() {
    let html = fs.readFileSync('product-detail.html', 'utf8');
    const oldHeadPart = html.substring(html.indexOf('<title>'), html.indexOf('<link rel="stylesheet" href="css/base.css">'));
    const newHeadPart = `<title>Industrial Chemical Specifications & MSDS Gujarat | Pavni Chemicals</title>
    <meta name="description" content="View complete specifications, purity grades, and Material Safety Data Sheets (MSDS) for 53+ industrial chemicals supplied by Pavni Chemicals across Gujarat.">
    <meta name="keywords" content="chemical specifications gujarat, msds download chemical ankleshwar, grasim chemical coa, epigral chemicals specs">
    <link rel="canonical" href="https://www.pavnichemicals.com/product-detail" />
    <meta name="geo.region" content="IN-GJ" />
    <meta name="geo.placename" content="Ankleshwar, Gujarat, India" />
    <meta name="geo.position" content="21.6270;73.0024" />
    <meta name="ICBM" content="21.6270, 73.0024" />
    `;
    html = html.replace(oldHeadPart, newHeadPart);
    fs.writeFileSync('product-detail.html', html, 'utf8');
    console.log('product-detail.html updated');
}

updateProductDetailHcl();
updateProductDetailH2o2();
updateProductDetailGeneric();
