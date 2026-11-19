/*
 * Products Database & Schema
 * Contains all 53 products with specifications, formulas, and local document links.
 * GST No: 24ABEFP4368B1ZG
 */

const productsData = [
    // -------------------------------------------------------------------------
    // INDUSTRIAL ALKALIES (1-10)
    // -------------------------------------------------------------------------
    {
        id: "caustic-lye",
        name: "Caustic Soda Lye",
        formula: "NaOH",
        category: "Alkalies",
        description: "Premium liquid sodium hydroxide. Fundamental for textiles, paper, and wastewater treatment.",
        msds: "docs/msds/MSDS-Caustic-Soda-Lye.pdf",
        grade: "Industrial / Rayon Grade",
        packaging: "Tankers / 50kg Bags",
        safety_summary: "Highly corrosive. Causes severe skin burns and eye damage. Use mandatory PPE.",
        specs: [
            { key: "Concentration", value: "48% - 50%" },
            { key: "CAS Number", value: "1310-73-2" },
            { key: "Appearance", value: "Clear, colorless liquid" },
            { key: "Specific Gravity", value: "1.50 - 1.52" },
            { key: "Solubility", value: "Highly soluble in water" }
        ],
        precautions: "Corrosive. Wear protective gloves/eye protection. Store in a cool, dry, well-ventilated area.",
        uses: ["Textile Processing", "Paper Pulp", "Soap/Detergent", "Water Treatment"],
        faqs: [
            { q: "What is the shelf life of Caustic Soda Lye?", a: "When stored in airtight containers, it has a shelf life of 2 years." },
            { q: "Do you provide COA with every batch?", a: "Yes, we provide a Certificate of Analysis (COA) with every dispatch." }
        ]
    },
    {
        id: "caustic-flakes",
        name: "Caustic Soda Flakes",
        formula: "NaOH",
        category: "Alkalies",
        image: "images/products/caustic-flakes.jpeg",
        description: "High purity solid caustic soda. Crucial for chemical manufacturing and dye intermediates.",
        msds: "docs/msds/MSDS-Caustic-Soda-Flakes.pdf",
        grade: "Industrial Grade",
        packaging: "50kg Bags",
        specs: [
            { key: "Purity (as NaOH)", value: "99.50% Min" },
            { key: "Sodium Carbonate", value: "0.40% Max" },
            { key: "Chlorides (as NaCl)", value: "0.10% Max" },
            { key: "Fe2O3", value: "20 ppm Max" }
        ],
        precautions: "Corrosive. Wear protective gloves/eye protection. Store in a cool, dry, well-ventilated area.",
        uses: ["Dye Intermediates", "Chemical Synthesis", "Rayon", "Metals"]
    },
    {
        id: "caustic-potash-lye",
        name: "Caustic Potash Lye",
        formula: "KOH",
        category: "Alkalies",
        description: "Potassium hydroxide solution for liquid soap, biodiesel, and electroplating industries.",
        msds: "docs/msds/MSDS-Caustic-Potash-Lye.pdf",
        specs: [
            { key: "KOH Content", value: "48% - 50%" },
            { key: "K2CO3", value: "0.5% Max" },
            { key: "Chlorides", value: "0.01% Max" }
        ],
        precautions: "Corrosive. Wear protective gloves/eye protection. Store in a cool, dry, well-ventilated area.",
        uses: ["Liquid Soap", "Fertilizers", "Electroplating", "Biodiesel"]
    },
    {
        id: "caustic-potash-flakes",
        name: "Caustic Potash Flakes",
        formula: "KOH",
        category: "Alkalies",
        description: "High-purity solid KOH for specialty soaps, cleaning agents, and pharmaceuticals.",
        msds: "docs/msds/MSDS-Caustic-Potash-Flakes.pdf",
        specs: [
            { key: "KOH Purity", value: "90% Min" },
            { key: "K2CO3", value: "0.2% Max" },
            { key: "Iron (Fe)", value: "5 ppm Max" }
        ],
        precautions: "Corrosive. Wear protective gloves/eye protection. Store in a cool, dry, well-ventilated area.",
        uses: ["Specialty Chemicals", "Pharmaceutics", "Potassium Salts"]
    },
    {
        id: "soda-ash-light",
        name: "Soda Ash Light",
        formula: "Na<sub>2</sub>CO<sub>3</sub>",
        category: "Alkalies",
        description: "Key ingredient for detergent making, paper industry, and glass manufacturing.",
        msds: "/docs/msds/soda-ash-light.pdf",
        specs: [
            { key: "Purity", value: "99.2% Min" },
            { key: "Chlorides", value: "0.5% Max" },
            { key: "Iron", value: "40 ppm Max" }
        ],
        precautions: "Corrosive. Wear protective gloves/eye protection. Store in a cool, dry, well-ventilated area.",
        uses: ["Detergents", "Glass", "Paper", "Water Softening"]
    },
    {
        id: "soda-ash-dense",
        name: "Soda Ash Dense",
        formula: "Na<sub>2</sub>CO<sub>3</sub>",
        category: "Alkalies",
        description: "High-density sodium carbonate for efficient glass production and water softening.",
        msds: "/docs/msds/soda-ash-dense.pdf",
        specs: [
            { key: "Purity", value: "99.4% Min" },
            { key: "Bulk Density", value: "0.9 - 1.0 g/cc" },
            { key: "Chlorides", value: "0.3% Max" }
        ],
        precautions: "Corrosive. Wear protective gloves/eye protection. Store in a cool, dry, well-ventilated area.",
        uses: ["Glass Manufacturing", "Industrial Cleaners", "Chemical Processing"]
    },
    {
        id: "sodium-bicarbonate",
        name: "Sodium Bicarbonate",
        formula: "NaHCO<sub>3</sub>",
        category: "Alkalies",
        description: "Technical grade for leather processing, textile fireproofing, and chemical buffering.",
        msds: "/docs/msds/sodium-bicarbonate.pdf",
        specs: [
            { key: "Purity", value: "99.0% Min" },
            { key: "Matter Insoluble", value: "0.1% Max" },
            { key: "pH (1% Soln)", value: "8.0 - 8.5" }
        ],
        precautions: "Corrosive. Wear protective gloves/eye protection. Store in a cool, dry, well-ventilated area.",
        uses: ["Leather", "Fire Extinguishers", "Textiles", "Buffering"]
    },
    {
        id: "hydrated-lime",
        name: "Hydrated Lime",
        formula: "Ca(OH)<sub>2</sub>",
        category: "Alkalies",
        description: "Calcium hydroxide for water treatment, construction, and chemical neutralization.",
        msds: "/docs/msds/hydrated-lime.pdf",
        specs: [
            { key: "Purity", value: "90% - 92%" },
            { key: "Silica", value: "0.5% Max" },
            { key: "MgO", value: "0.5% Max" }
        ],
        precautions: "Corrosive. Wear protective gloves/eye protection. Store in a cool, dry, well-ventilated area.",
        uses: ["Water Purification", "Construction", "Effluent Treatment"]
    },
    {
        id: "bleaching-powder",
        name: "Stable Bleaching Powder",
        formula: "CaOCl<sub>2</sub>",
        category: "Alkalies",
        description: "Efficient disinfecting agent for water purification and large-scale industrial bleaching.",
        msds: "docs/msds/MSDS-Stable-Bleaching-Powder.pdf",
        specs: [
            { key: "Available Chlorine", value: "33% Min" },
            { key: "Moisture", value: "0.3% Max" },
            { key: "Stability", value: "High Stable Grade" }
        ],
        precautions: "Corrosive. Wear protective gloves/eye protection. Store in a cool, dry, well-ventilated area.",
        uses: ["Drinking Water Safety", "Sanitation", "Bleaching"]
    },
    {
        id: "sodium-hypo",
        name: "Sodium Hypochlorite",
        formula: "NaOCl",
        category: "Alkalies",
        description: "Broad-spectrum disinfectant and bleaching agent for multi-industry application.",
        msds: "docs/msds/MSDS-Sodium-Hypochlorite.pdf",
        specs: [
            { key: "Available Chlorine", value: "10% - 12%" },
            { key: "Free Causticity", value: "0.5% - 1.0%" },
            { key: "Appearance", value: "Pale yellow liquid" }
        ],
        precautions: "Corrosive. Wear protective gloves/eye protection. Store in a cool, dry, well-ventilated area.",
        uses: ["Water Treatment", "Swimming Pools", "Bleaching", "Cleaning"]
    },

    // -------------------------------------------------------------------------
    // ACIDS (11-20)
    // -------------------------------------------------------------------------
    {
        id: "hcl",
        name: "Hydrochloric Acid",
        formula: "HCl",
        category: "Acids",
        description: "Strong mineral acid for steel pickling, pH adjustment, and diverse chemical synthesis.",
        msds: "docs/msds/MSDS-Hydrochloric-Acid.pdf",
        specs: [
            { key: "Concentration", value: "30% - 33%" },
            { key: "Iron Content", value: "0.01% Max" },
            { key: "Appearance", value: "Colorless to pale yellow" }
        ],
        precautions: "Highly Corrosive. Avoid breathing vapors. Use mandatory PPE. In case of contact, rinse immediately with water.",
        uses: ["Steel Pickling", "Ore Processing", "Chemical Synthesis"]
    },
    {
        id: "h2so4",
        name: "Sulphuric Acid",
        formula: "H<sub>2</sub>SO<sub>4</sub>",
        category: "Acids",
        description: "Industrial core chemical used in fertilizers, batteries, and chemical manufacturing.",
        msds: "/docs/msds/sulphuric-acid.pdf",
        specs: [
            { key: "Purity", value: "98% Min" },
            { key: "Iron", value: "50 ppm Max" },
            { key: "Residue on ignition", value: "0.2% Max" }
        ],
        precautions: "Highly Corrosive. Avoid breathing vapors. Use mandatory PPE. In case of contact, rinse immediately with water.",
        uses: ["Fertilizers", "Oil Refining", "Acid Batteries", "Metal Processing"]
    },
    {
        id: "acetic-acid",
        name: "Acetic Acid",
        formula: "CH<sub>3</sub>COOH",
        category: "Acids",
        image: "images/products/Acetic_Acid.jpeg",
        description: "Industrial scale production of polymers, paints, and textile auxiliary chemicals.",
        msds: "/docs/msds/acetic-acid.pdf",
        specs: [
            { key: "Purity", value: "99.8% Min" },
            { key: "Water Content", value: "0.15% Max" },
            { key: "Flash Point", value: "39°C" }
        ],
        precautions: "Highly Corrosive. Avoid breathing vapors. Use mandatory PPE. In case of contact, rinse immediately with water.",
        uses: ["Vinyl Acetate", "Solvent", "Textile Finishing"]
    },
    {
        id: "formic-acid",
        name: "Formic Acid",
        formula: "HCOOH",
        category: "Acids",
        image: "images/products/formic-acid.jpeg",
        description: "Advanced tanning agent for leather and dyeing assistant in the textile segment.",
        msds: "/docs/msds/formic-acid.pdf",
        specs: [
            { key: "Concentration", value: "85% Min" },
            { key: "Chlorides", value: "10 ppm Max" },
            { key: "Iron", value: "5 ppm Max" }
        ],
        precautions: "Highly Corrosive. Avoid breathing vapors. Use mandatory PPE. In case of contact, rinse immediately with water.",
        uses: ["Leather Tanning", "Textile Dyeing", "Rubber", "Agriculture"]
    },
    {
        id: "sulphamic-acid",
        name: "Sulphamic Acid",
        formula: "H<sub>2</sub>NSO<sub>3</sub>H",
        category: "Acids",
        description: "Descaling expert for removing calcium deposits in industrial boilers and pipes.",
        msds: "/docs/msds/sulphamic-acid.pdf",
        specs: [
            { key: "Purity", value: "99.5% Min" },
            { key: "Moisture", value: "0.1% Max" },
            { key: "Appearance", value: "White crystalline powder" }
        ],
        precautions: "Highly Corrosive. Avoid breathing vapors. Use mandatory PPE. In case of contact, rinse immediately with water.",
        uses: ["Descaling", "Metal Cleaning", "Dyeing", "Chlorine Stabilization"]
    },
    {
        id: "phosphoric-acid-tech",
        name: "Phosphoric Acid (Tech)",
        formula: "H<sub>3</sub>PO<sub>4</sub>",
        category: "Acids",
        description: "85% concentration for fertilizers, detergents, and industrial surface treatments.",
        msds: "docs/msds/MSDS-Phosphoric-Acid-Technical-Grade.pdf",
        specs: [
            { key: "Purity", value: "85% Min" },
            { key: "Heavy Metals", value: "10 ppm Max" },
            { key: "Arsenic", value: "1 ppm Max" }
        ],
        precautions: "Highly Corrosive. Avoid breathing vapors. Use mandatory PPE. In case of contact, rinse immediately with water.",
        uses: ["Fertilizers", "Surface Treatment", "Detergents"]
    },
    {
        id: "phosphoric-acid-food",
        name: "Phosphoric Acid (Food Grade)",
        formula: "H<sub>3</sub>PO<sub>4</sub>",
        category: "Acids",
        description: "Purified grade for food processing, beverages, and sensitive pharmaceutical needs.",
        msds: "/docs/msds/phosphoric-acid-food.pdf",
        specs: [
            { key: "Purity", value: "85.5% Min" },
            { key: "Food Safety", value: "FCC / Food Grade Compliant" },
            { key: "Heavy Metals", value: "5 ppm Max" }
        ],
        precautions: "Highly Corrosive. Avoid breathing vapors. Use mandatory PPE. In case of contact, rinse immediately with water.",
        uses: ["Beverages", "Jam/Jelly Processing", "Pharmaceuticals"]
    },
    {
        id: "nitric-acid",
        name: "Nitric Acid",
        formula: "HNO<sub>3</sub>",
        category: "Acids",
        description: "Oxidizing agent for metal etching, electronics, and specialty chemical synthesis.",
        msds: "/docs/msds/nitric-acid.pdf",
        specs: [
            { key: "Concentration", value: "68% - 70%" },
            { key: "Iron Content", value: "0.01% Max" }
        ],
        precautions: "Highly Corrosive. Avoid breathing vapors. Use mandatory PPE. In case of contact, rinse immediately with water.",
        uses: ["Explosives", "Electronics Etching", "Fertilizers"]
    },
    {
        id: "hf-acid",
        name: "Hydrofluoric Acid",
        formula: "HF",
        category: "Acids",
        description: "Critical for glass etching, metal cleaning, and semiconductor processing.",
        msds: "/docs/msds/hydrofluoric-acid.pdf",
        specs: [
            { key: "Concentration", value: "40% / 48% / 70%" },
            { key: "Heavy Metals", value: "5 ppm Max" }
        ],
        precautions: "Highly Corrosive. Avoid breathing vapors. Use mandatory PPE. In case of contact, rinse immediately with water.",
        uses: ["Glass Etching", "Electronics", "Metal Cleaning"]
    },
    {
        id: "oxalic-acid",
        name: "Oxalic Acid",
        formula: "C<sub>2</sub>H<sub>2</sub>O<sub>4</sub>",
        category: "Acids",
        description: "Effective whitening and bleaching agent for wood, textiles, and stone polishing.",
        msds: "/docs/msds/oxalic-acid.pdf",
        specs: [
            { key: "Purity", value: "99.6% Min" },
            { key: "Sulphate", value: "0.08% Max" },
            { key: "Appearance", value: "White crystals" }
        ],
        precautions: "Highly Corrosive. Avoid breathing vapors. Use mandatory PPE. In case of contact, rinse immediately with water.",
        uses: ["Wood Bleaching", "Metal Polishing", "Textile Finishing"]
    },

    // -------------------------------------------------------------------------
    // SOLVENTS & FINE CHEMICALS (21-32)
    // -------------------------------------------------------------------------
    {
        id: "acetone",
        name: "Acetone",
        formula: "C<sub>3</sub>H<sub>6</sub>O",
        category: "Solvents",
        description: "Powerful solvent for paints, adhesives, and pharmaceutical production lines.",
        msds: "/docs/msds/acetone.pdf",
        specs: [
            { key: "Purity", value: "99.5% Min" },
            { key: "Water Content", value: "0.3% Max" }
        ],
        precautions: "Flammable/Volatile. Keep away from heat and open flames. Use only in well-ventilated spaces.",
        uses: ["Solvent", "Industrial Cleaning", "Lab Use"]
    },
    {
        id: "ipa",
        name: "IPA (Isopropyl Alcohol)",
        formula: "IPA",
        category: "Solvents",
        description: "99%+ high-purity solvent for sanitization, cosmetics, and electronics cleaning.",
        msds: "/docs/msds/ipa.pdf",
        specs: [
            { key: "Purity", value: "99.8% Min" },
            { key: "Water Content", value: "0.1% Max" }
        ],
        precautions: "Flammable/Volatile. Keep away from heat and open flames. Use only in well-ventilated spaces.",
        uses: ["Sanitization", "Cosmetics", "Optics Cleaning"]
    },
    {
        id: "toluene",
        name: "Toluene",
        formula: "C<sub>7</sub>H<sub>8</sub>",
        category: "Solvents",
        description: "Aromatic solvent essential for industrial coatings, cements, and fuel additives.",
        msds: "/docs/msds/toluene.pdf",
        specs: [
            { key: "Purity", value: "99.7% Min" },
            { key: "Color (APHA)", value: "20 Max" }
        ],
        precautions: "Flammable/Volatile. Keep away from heat and open flames. Use only in well-ventilated spaces.",
        uses: ["Paints", "Fuel Blending", "Rubber Solvent"]
    },
    {
        id: "mdc",
        name: "Methylene Chloride (MDC)",
        formula: "CH<sub>2</sub>Cl<sub>2</sub>",
        category: "Solvents",
        description: "Effective vapor degreaser, paint remover, and pharmaceutical process solvent.",
        msds: "docs/msds/MSDS-Methylene-Chloride.pdf",
        specs: [
            { key: "Purity", value: "99.9% Min" },
            { key: "Acidity (as HCl)", value: "10 ppm Max" }
        ],
        precautions: "Flammable/Volatile. Keep away from heat and open flames. Use only in well-ventilated spaces.",
        uses: ["Degreasing", "Foam Blowing", "Chemical Extraction"]
    },
    {
        id: "chloroform",
        name: "Chloroform",
        formula: "CHCl<sub>3</sub>",
        category: "Solvents",
        description: "Core intermediate for refrigerant production and pharmaceutical synthesis.",
        msds: "docs/msds/MSDS-Chloroform.pdf",
        specs: [
            { key: "Purity", value: "99.5% Min" },
            { key: "Free Chlorine", value: "Passes test" }
        ],
        precautions: "Flammable/Volatile. Keep away from heat and open flames. Use only in well-ventilated spaces.",
        uses: ["Refrigerants", "Synthetic Intermediate", "Solvent"]
    },
    {
        id: "benzyl-chloride",
        name: "Benzyl Chloride",
        formula: "C<sub>7</sub>H<sub>7</sub>Cl",
        category: "Solvents",
        description: "High-end intermediate for plasticizers, fragrances, and antiseptic agents.",
        msds: "docs/msds/MSDS-BENZYL-CHLORIDE.pdf",
        specs: [
            { key: "Purity", value: "99.0% Min" },
            { key: "Free Acid", value: "0.2% Max" }
        ],
        precautions: "Flammable/Volatile. Keep away from heat and open flames. Use only in well-ventilated spaces.",
        uses: ["Synthetic Fragrances", "Plasticizers", "Antiseptics"]
    },
    {
        id: "benzyl-alcohol",
        name: "Benzyl Alcohol",
        formula: "C<sub>7</sub>H<sub>8</sub>O",
        category: "Solvents",
        description: "Safe aromatic solvent used in cosmetics, inks, and pharmaceutical formulations.",
        msds: "docs/msds/MSDS-BENZYL-ALCOHOL.pdf",
        specs: [
            { key: "Purity", value: "99.9% Min" },
            { key: "Benzaldehyde", value: "0.1% Max" }
        ],
        precautions: "Flammable/Volatile. Keep away from heat and open flames. Use only in well-ventilated spaces.",
        uses: ["Cosmetics", "Industrial Inks", "Preservative"]
    },
    {
        id: "benzaldehyde",
        name: "Benzaldehyde",
        formula: "C<sub>7</sub>H<sub>6</sub>O",
        category: "Solvents",
        description: "The simplest aromatic aldehyde, crucial for flavoring, dyes, and drug manufacture.",
        msds: "docs/msds/MSDS-BENZALDEHYDE.pdf",
        specs: [
            { key: "Purity", value: "99.5% Min" },
            { key: "Chlorine Content", value: "20 ppm Max" }
        ],
        precautions: "Flammable/Volatile. Keep away from heat and open flames. Use only in well-ventilated spaces.",
        uses: ["Fiber Flavoring", "Dye Intermediates", "Agriculture"]
    },
    {
        id: "methanol",
        name: "Methanol",
        formula: "CH<sub>3</sub>OH",
        category: "Solvents",
        description: "Industrial fuel, antifreeze, and universal building block for organic chemistry.",
        msds: "/docs/msds/methanol.pdf",
        specs: [
            { key: "Purity", value: "99.85% Min" },
            { key: "Water", value: "0.1% Max" }
        ],
        precautions: "Flammable/Volatile. Keep away from heat and open flames. Use only in well-ventilated spaces.",
        uses: ["Industrial Fuel", "Antifreeze", "Organic Synthesis"]
    },
    {
        id: "ethyl-acetate",
        name: "Ethyl Acetate",
        formula: "C<sub>4</sub>H<sub>8</sub>O<sub>2</sub>",
        category: "Solvents",
        description: "Fruity-smelling solvent for nail polish, glues, and decaffeination processes.",
        msds: "/docs/msds/ethyl-acetate.pdf",
        specs: [
            { key: "Purity", value: "99.9% Min" },
            { key: "Acidity", value: "0.01% Max" }
        ],
        precautions: "Flammable/Volatile. Keep away from heat and open flames. Use only in well-ventilated spaces.",
        uses: ["Surface Coatings", "Printing Inks", "Extraction"]
    },
    {
        id: "h2o2-35",
        name: "Hydrogen Peroxide (35%)",
        formula: "H<sub>2</sub>O<sub>2</sub>",
        category: "Solvents",
        description: "Eco-friendly oxidizing agent for textile bleaching and water decontamination.",
        msds: "docs/msds/MSDS-Hydrogen-Peroxide.pdf",
        specs: [
            { key: "Strength", value: "35% (v/v)" },
            { key: "Stability", value: "High Stability Grade" }
        ],
        precautions: "Flammable/Volatile. Keep away from heat and open flames. Use only in well-ventilated spaces.",
        uses: ["Bleaching", "Effluent Treatment", "Agriculture"]
    },
    {
        id: "h2o2-50",
        name: "Hydrogen Peroxide (50%/60%)",
        formula: "H<sub>2</sub>O<sub>2</sub>",
        category: "Solvents",
        description: "Concentrated grade for advanced effluent treatment and aerospace processes.",
        msds: "docs/msds/MSDS-Hydrogen-Peroxide.pdf",
        specs: [
            { key: "Strength", value: "50% - 60%" },
            { key: "Free Acid", value: "0.02% Max" }
        ],
        precautions: "Flammable/Volatile. Keep away from heat and open flames. Use only in well-ventilated spaces.",
        uses: ["Paper Pulp", "Industrial Bleaching", "Waste Treatment"]
    },

    // -------------------------------------------------------------------------
    // INORGANIC CHEMICALS (33-38)
    // -------------------------------------------------------------------------
    {
        id: "liquid-chlorine",
        name: "Liquid Chlorine",
        formula: "Cl<sub>2</sub>",
        category: "Inorganic",
        description: "Cylinders/Tonners for large-scale water chlorination and plastic manufacturing.",
        msds: "docs/msds/MSDS-Liquide-Chlorine.pdf",
        specs: [
            { key: "Purity", value: "99.5% Min" },
            { key: "Moisture", value: "20 ppm Max" }
        ],
        precautions: "Generally requires moisture-free storage and mandatory skin/eye protection.",
        uses: ["Water Sanitation", "PVC Manufacture", "Disinfection"]
    },
    {
        id: "pac",
        name: "Poly Aluminium Chloride",
        formula: "PAC",
        category: "Inorganic",
        image: "images/products/pac-powder.jpeg",
        description: "Specialty coagulant for clarifying drinking water and industrial effluents.",
        msds: "docs/msds/MSDS-Poly-Aluminium-Chloride.pdf",
        specs: [
            { key: "Al2O3 Content", value: "30% Min" },
            { key: "Basicity", value: "35% - 85%" }
        ],
        precautions: "Generally requires moisture-free storage and mandatory skin/eye protection.",
        uses: ["Drinking Water Clarification", "Effluent Processing"]
    },
    {
        id: "alcl3-anhydrous",
        name: "Aluminium Chloride Anhydrous",
        formula: "AlCl<sub>3</sub>",
        category: "Inorganic",
        description: "Critical catalyst for Friedel-Crafts reactions and organic intermediates.",
        msds: "/docs/msds/alcl3-anhydrous.pdf",
        specs: [
            { key: "Purity", value: "98% Min" },
            { key: "Iron Content", value: "100 ppm Max" }
        ],
        precautions: "Generally requires moisture-free storage and mandatory skin/eye protection.",
        uses: ["Catalyst", "Organic Synthesis", "Lubricating Oils"]
    },
    {
        id: "fecl3",
        name: "Ferric Chloride",
        formula: "FeCl<sub>3</sub>",
        category: "Inorganic",
        description: "Essential for sewage treatment and as an etchant for printed circuit boards (PCB).",
        msds: "/docs/msds/ferric-chloride.pdf",
        specs: [
            { key: "Strength", value: "38% - 42% (Liquid)" },
            { key: "Purity", value: "98% Min (Anhydrous)" }
        ],
        precautions: "Generally requires moisture-free storage and mandatory skin/eye protection.",
        uses: ["Sewage Treatment", "PCB Etching", "Water Reuse"]
    },
    {
        id: "feso4",
        name: "Ferrous Sulphate",
        formula: "FeSO<sub>4</sub>",
        category: "Inorganic",
        description: "Used as a reducing agent in hazardous waste and as an iron fortifier in agriculture.",
        msds: "/docs/msds/ferrous-sulphate.pdf",
        specs: [
            { key: "Purity", value: "98% Min" },
            { key: "Iron (Fe)", value: "19.5% Min" }
        ],
        precautions: "Generally requires moisture-free storage and mandatory skin/eye protection.",
        uses: ["Agriculture", "Hazardous Waste Neutralization", "Dyeing"]
    },
    {
        id: "mgso4",
        name: "Magnesium Sulphate",
        formula: "MgSO<sub>4</sub>",
        category: "Inorganic",
        description: "Known as Epsom Salt; critical for agriculture (Epsonite) and construction materials.",
        msds: "/docs/msds/magnesium-sulphate.pdf",
        specs: [
            { key: "Purity", value: "99% Min" },
            { key: "Appearance", value: "White crystals" }
        ],
        precautions: "Generally requires moisture-free storage and mandatory skin/eye protection.",
        uses: ["Agriculture", "Construction", "Fireproofing"]
    },

    // -------------------------------------------------------------------------
    // PERFORMANCE & SPECIALTY (39-43)
    // -------------------------------------------------------------------------
    {
        id: "deformer",
        name: "Industrial Deformer",
        formula: "DEFORM",
        category: "Performance",
        description: "Superior foam suppression for industrial processing and effluent treatment plants.",
        msds: "/docs/msds/deformer.pdf",
        specs: [
            { key: "Base", value: "Silicone / Non-Silicone" },
            { key: "pH Range", value: "2.0 - 12.0 Effective" }
        ],
        precautions: "Handle with care. Avoid prolonged skin contact. Store in original sealed containers.",
        uses: ["Defoaming", "ETP Plants", "Industrial Reactors"]
    },
    {
        id: "ph-controller",
        name: "pH Controller",
        formula: "pH CTRL",
        category: "Performance",
        description: "Range of acidic and basic solutions for maintaining precise pH in closed-loop systems.",
        msds: "/docs/msds/ph-controller.pdf",
        specs: [
            { key: "Form", value: "Custom Concentration" },
            { key: "Control", value: "Precision Buffering" }
        ],
        precautions: "Handle with care. Avoid prolonged skin contact. Store in original sealed containers.",
        uses: ["Lab Systems", "Boiler Feed Water", "Industrial pH"]
    },
    {
        id: "hydrazine-80",
        name: "Hydrazine Hydrate (80%)",
        formula: "N<sub>2</sub>H<sub>4</sub>",
        category: "Performance",
        description: "Powerful reducing agent for boiler corrosion control and chemical synthesis.",
        msds: "docs/msds/MSDS-Hydrazine-Hydrate.pdf",
        specs: [
            { key: "Purity", value: "80% Min" },
            { key: "Chlorides", value: "10 ppm Max" }
        ],
        precautions: "Handle with care. Avoid prolonged skin contact. Store in original sealed containers.",
        uses: ["Corrosion Inhibition", "Metal Finishing", "Pharma"]
    },
    {
        id: "sodium-metabisulphite",
        name: "Sodium Metabisulphite",
        formula: "Na<sub>2</sub>S<sub>2</sub>O<sub>5</sub>",
        category: "Performance",
        description: "Key antioxidant and preservative for chemicals, textiles, and water treatment.",
        msds: "/docs/msds/sodium-metabisulphite.pdf",
        specs: [
            { key: "Purity", value: "98% Min" },
            { key: "SO2 Content", value: "66% Min" }
        ],
        precautions: "Handle with care. Avoid prolonged skin contact. Store in original sealed containers.",
        uses: ["Antioxidant", "Preservative", "De-chlorination"]
    },
    {
        id: "sodium-bisulphite",
        name: "Sodium Bisulphite",
        formula: "NaHSO<sub>3</sub>",
        category: "Performance",
        description: "High-efficiency reducing agent for effluent treatment and leather finishing.",
        msds: "/docs/msds/sodium-bisulphite.pdf",
        specs: [
            { key: "SO2 Content", value: "64% Min" },
            { key: "Appearance", value: "White crystalline powder" }
        ],
        precautions: "Handle with care. Avoid prolonged skin contact. Store in original sealed containers.",
        uses: ["Effluent Treatment", "Leather Finishing", "Lab Chem"]
    },
    {
        id: "ammonium-sulphate",
        name: "Ammonium Sulphate",
        formula: "(NH<sub>4</sub>)<sub>2</sub>SO<sub>4</sub>",
        category: "Inorganic",
        description: "Industrial grade for soil nutrition and specialty chemical production.",
        msds: "docs/msds/ammonium-sulphate.pdf",
        specs: [{ key: "Nitrogen", value: "21% Min" }, { key: "Moisture", value: "0.5% Max" }],
        uses: ["Fertilizers", "Water Treatment", "Food Additive"]
    },
    {
        id: "dolomite-powder",
        name: "Dolomite Powder",
        formula: "CaMg(CO<sub>3</sub>)<sub>2</sub>",
        category: "Inorganic",
        description: "High-purity mineral filler for paints, ceramics, and rubber industries.",
        msds: "docs/msds/dolomite.pdf",
        specs: [{ key: "Purity", value: "98% Min" }, { key: "Whiteness", value: "95% Min" }],
        uses: ["Paints", "Ceramics", "Rubber", "Agriculture"]
    },
    {
        id: "antiscalent",
        name: "Antiscalent",
        formula: "RO ANTI",
        category: "Performance",
        description: "Advanced RO membrane protection against mineral scaling and fouling.",
        msds: "docs/msds/antiscalent.pdf",
        specs: [{ key: "pH", value: "2.0 - 3.0" }, { key: "Specific Gravity", value: "1.10 - 1.20" }],
        uses: ["RO Systems", "Desalination", "Boiler Feed"]
    },
    {
        id: "defoamer-special",
        name: "Industrial Defoamer",
        formula: "FOAM-X",
        category: "Performance",
        description: "Non-silicone based foam suppressor for aggressive industrial processing.",
        msds: "docs/msds/defoamer.pdf",
        specs: [{ key: "Type", value: "Non-Silicone" }, { key: "pH", value: "6.0 - 8.0" }],
        uses: ["ETP Plants", "Textile Processing", "Paper Mills"]
    },
    {
        id: "sodium-acetate-anh",
        name: "Sodium Acetate Anhydrous",
        formula: "CH<sub>3</sub>COONa",
        category: "Inorganic",
        description: "Technical grade for textile dyeing, chrome tanning, and chemical buffering.",
        msds: "docs/msds/sodium-acetate-anh.pdf",
        specs: [{ key: "Purity", value: "99% Min" }, { key: "Moisture", value: "0.5% Max" }],
        uses: ["Textiles", "Leather", "Buffering Agent"]
    },
    {
        id: "sodium-acetate-tri",
        name: "Sodium Acetate Trihydrate",
        formula: "CH<sub>3</sub>COONa·3H<sub>2</sub>O",
        category: "Inorganic",
        description: "Crystalline grade for diverse chemical synthesis and heating pads.",
        msds: "docs/msds/sodium-acetate-tri.pdf",
        specs: [{ key: "Purity", value: "58% Min (as Anh)" }, { key: "Appearance", value: "White crystals" }],
        uses: ["Dyeing", "Photography", "Chemical Synthesis"]
    },
    {
        id: "magnesium-oxide",
        name: "Magnesium Oxide",
        formula: "MgO",
        category: "Inorganic",
        description: "Light/Heavy grade for fertilizers, ceramics, and industrial refractories.",
        msds: "docs/msds/magnesium-oxide.pdf",
        specs: [{ key: "MgO Content", value: "85% - 92%" }, { key: "Iron", value: "0.5% Max" }],
        uses: ["Fertilizers", "Refractories", "Rubber"]
    },
    {
        id: "edta-disodium",
        name: "EDTA Disodium",
        formula: "Na<sub>2</sub>EDTA",
        category: "Performance",
        description: "High-efficiency chelating agent for water softening and cosmetics.",
        msds: "docs/msds/edta-disodium.pdf",
        specs: [{ key: "Purity", value: "99% Min" }, { key: "pH", value: "4.0 - 5.0" }],
        uses: ["Water Softening", "Cosmetics", "Textile Processing"]
    },
    {
        id: "citric-acid",
        name: "Citric Acid Anhydrous",
        formula: "C<sub>6</sub>H<sub>8</sub>O<sub>7</sub>",
        category: "Acids",
        description: "Industrial and food grade cleaning agent, preservative, and pH regulator.",
        msds: "docs/msds/citric-acid.pdf",
        specs: [{ key: "Purity", value: "99.5% Min" }, { key: "Appearance", value: "White powder" }],
        uses: ["Cleaning Agents", "Food Preservative", "Descaling"]
    },
    {
        id: "citric-acid-monohydrate",
        name: "Citric Acid Monohydrate",
        formula: "C<sub>6</sub>H<sub>8</sub>O<sub>7</sub>·H<sub>2</sub>O",
        category: "Acids",
        image: "images/products/citric-acid.jpeg",
        description: "Hydrated form of citric acid widely used as an acidulant, preservative, and chelating agent in food, beverage, pharmaceutical, and industrial applications.",
        msds: "docs/msds/citric-acid-monohydrate.pdf",
        grade: "Food / Technical Grade",
        packaging: "25kg Bags",
        safety_summary: "Mildly irritating to eyes and skin. Wear protective gloves and eye protection during handling. Store in cool, dry conditions away from moisture.",
        specs: [
            { key: "Purity (as C₆H₈O₇·H₂O)", value: "99.5% Min" },
            { key: "CAS Number", value: "5949-29-1" },
            { key: "Appearance", value: "White crystalline granules" },
            { key: "Moisture", value: "7.5% - 9.0%" },
            { key: "Sulphated Ash", value: "0.05% Max" },
            { key: "Heavy Metals (as Pb)", value: "10 ppm Max" },
            { key: "Oxalates", value: "350 ppm Max" },
            { key: "pH (1% Solution)", value: "1.8 - 2.2" }
        ],
        precautions: "Mildly irritating. Wear gloves and eye protection. Store in cool, dry area.",
        uses: ["Food & Beverage Acidulant", "Pharmaceutical Excipient", "Cleaning Agents", "Water Treatment", "Cosmetics"],
        faqs: [
            { q: "What is the difference between Citric Acid Monohydrate and Anhydrous?", a: "Monohydrate contains one molecule of water of crystallization (~8.5% moisture), making it slightly less concentrated but more stable in storage. Anhydrous is water-free and has higher active citric acid content per kg." },
            { q: "Is this product food grade?", a: "Yes, we supply both food grade (FCC compliant) and technical grade variants. Please specify your requirement when placing an order." },
            { q: "What is the standard packaging?", a: "Standard packaging is 25kg HDPE-lined bags. Custom packaging available on bulk orders." }
        ]
    }
];

// Helper to get product by ID
function getProductById(id) {
    const data = window.productsData || [];
    return data.find(p => p.id === id);
}

// Expose globally
if (typeof window !== 'undefined') {
    window.productsData = productsData;
    window.getProductById = getProductById;
}
