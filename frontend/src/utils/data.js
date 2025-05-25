const poles = [
  {
    code: "P101",
    intitule: "Pôle Energies Renouvelables",
    directeur: "Samira Khelifi",
    commune: "Alger Centre",
    wilaya: "Alger",
    documents: ["doc_001", "doc_004", "doc_006", "doc_007", "doc_008"],
    password: "P101Secure"
  },
  {
    code: "P102",
    intitule: "Pôle Construction Industrielle",
    directeur: "Mohamed Bensaid",
    commune: "Oued Smar",
    wilaya: "Alger",
    documents: ["doc_002", "doc_005", "doc_009", "doc_010", "doc_011"],
    password: "P102Secure"
  }
];

const directors = [
  {
    nom: "Samira Khelifi",
    email: "samira.k@entreprise.dz",
    telephone: "+213 555 111 222",
    polesAssocies: ["P101"],
    nombrePoles: 1
  },
  {
    nom: "Mohamed Bensaid",
    email: "mohamed.b@entreprise.dz",
    telephone: "+213 555 333 444",
    polesAssocies: ["P102"],
    nombrePoles: 1
  }
];

const nts = [
  {
    pole: "P101",
    nt: "NT-2025-101",
    intituleNT: "Normes Photovoltaïques"
  }
];

const documentTypes = {
  construction_timesheet: {
    name: "Fiche de temps construction",
    code: "PRO-04-ENR-10"
  },
  flash_mensuel: {
    name: "Flash Mensuel",
    code: "PRO-04-ENR-10"
  },
  recap_sortie_atelier: {
    name: "Récap Sortie Atelier",
    code: "PRO-04-ENR-10"
  },
  recap_sortie_chaudronnerie: {
    name: "Récap Sortie Chaudronnerie",
    code: "PRO-04-ENR-10"
  },
  warehouse_inventory: {
    name: "Inventaire Magasin",
    code: "PRO.04-ENR.10"
  }
};

const documents = {
  doc_001: {
    id: "doc_001",
    type: "construction_timesheet",
    pole: "P101",
    data: {
      mois: "May 2025",
      structures: {
        GESTION: 40,
        "ATELIER CHAUDRONNERIE": 35
      },
      activities: {
        "TERRASSEMENTS GENERAUX": [10, 5, 0, 0, 0]
      }
    }
  },
  doc_002: {
    id: "doc_002",
    type: "flash_mensuel",
    pole: "P102",
    data: {
      intitule: "Projet Barrage",
      mois: "April 2024",
      activities: {
        terrassementsGeneraux: { quantite: "1500", valeurKDA: "4500000" }
      }
    }
  },
  doc_004: {
    id: "doc_004",
    type: "recap_sortie_chaudronnerie",
    pole: "P101",
    data: {
      mois: "April 2024",
      atelierMecanique: 1250.5
    }
  },
  doc_005: {
    id: "doc_005",
    type: "warehouse_inventory",
    pole: "P102",
    data: {
      month: "May 2025",
      categories: [
        {
          name: "GESTION",
          items: [{ name: "FOURNITURES DE BUREAU", unit: "DA", quantity: 15 }]
        }
      ]
    }
  },
  doc_006: {
    id: "doc_006",
    type: "recap_sortie_atelier",
    pole: "P101",
    data: {
      mois: "March 2024",
      atelierPrefa: 12.5,
      destinations: [{ destination: "Chantier A", armatures: 5.2 }]
    }
  },
  doc_007: {
    id: "doc_007",
    type: "flash_mensuel",
    pole: "P101",
    data: {
      intitule: "Projet Solaire",
      mois: "June 2024",
      activities: {
        installationPanneaux: { quantite: "200", valeurKDA: "3000000" }
      }
    }
  },
  doc_008: {
    id: "doc_008",
    type: "warehouse_inventory",
    pole: "P101",
    data: {
      month: "June 2024",
      categories: [
        {
          name: "EQUIPEMENTS SOLAIRES",
          items: [
            { name: "PANNEAUX PHOTOVOLTAIQUES", unit: "Unité", quantity: 50 }
          ]
        }
      ]
    }
  },
  doc_009: {
    id: "doc_009",
    type: "construction_timesheet",
    pole: "P102",
    data: {
      mois: "May 2025",
      structures: { GESTION: 50, "ATELIER CONSTRUCTION": 45 },
      activities: { "CONSTRUCTION BARRAGE": [15, 10, 5, 0, 0] }
    }
  },
  doc_010: {
    id: "doc_010",
    type: "recap_sortie_atelier",
    pole: "P102",
    data: {
      mois: "April 2024",
      atelierPrefa: 15.0,
      destinations: [{ destination: "Chantier B", armatures: 7.8 }]
    }
  },
  doc_011: {
    id: "doc_011",
    type: "recap_sortie_chaudronnerie",
    pole: "P102",
    data: {
      mois: "June 2024",
      atelierMecanique: 1800.0
    }
  }
};

// Helper functions
function getDocumentsByPole(poleCode) {
  return Object.values(documents).filter(doc => doc.pole === poleCode);
}

function getDocumentById(id) {
  return documents[id];
}

function getPoleByCode(code) {
  return poles.find(pole => pole.code === code);
}

function addDocument(newDoc) {
  console.log('addDocument called with:', newDoc);
  const docId = newDoc.id;
  documents[docId] = newDoc;
  const pole = poles.find(p => p.code === newDoc.pole);
  if (pole && !pole.documents.includes(docId)) {
    pole.documents.push(docId);
    console.log(`Updated pole ${pole.code} documents:`, pole.documents);
  } else if (!pole) {
    console.error(`No pole found for poleCode: ${newDoc.pole}`);
  }
}

function getPolesWithSubmissions() {
  return poles.map(pole => {
    if (!pole.documents || pole.documents.length === 0) {
      return { ...pole, last_submission: 'Aucune' };
    }
    const poleDocs = pole.documents.map(docId => documents[docId]).filter(doc => doc);
    if (poleDocs.length === 0) {
      return { ...pole, last_submission: 'Aucune' };
    }
    const latestDoc = poleDocs.reduce((latest, doc) => {
      const latestMois = latest.data.mois || latest.data.month || 'January 1970';
      const currentMois = doc.data.mois || doc.data.month || 'January 1970';
      return new Date(currentMois) > new Date(latestMois) ? doc : latest;
    });
    const mois = latestDoc.data.mois || latestDoc.data.month || 'January 1970';
    const date = new Date(mois);
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`;
    return { ...pole, last_submission: formattedDate };
  });
}

function addPole(newPole) {
  console.log('data.js: Adding pole with data:', newPole);
  if (!newPole.code || !newPole.intitule) {
    console.error('data.js: Missing required fields:', newPole);
    throw new Error('Code et intitulé sont requis.');
  }
  if (poles.find(p => p.code === newPole.code)) {
    console.error('data.js: Duplicate pole code:', newPole.code);
    throw new Error(`Un pôle avec le code ${newPole.code} existe déjà.`);
  }
  try {
    const poleData = {
      code: newPole.code,
      intitule: newPole.intitule,
      directeur: newPole.directeur || "",
      commune: newPole.commune || "",
      wilaya: newPole.wilaya || "",
      documents: [],
      password: newPole.password || `${newPole.code}Secure`
    };
    poles.push(poleData);
    if (newPole.directeur) {
      const director = directors.find(d => d.nom === newPole.directeur);
      if (director) {
        director.polesAssocies.push(newPole.code);
        director.nombrePoles = director.polesAssocies.length;
        console.log('data.js: Updated director', director.nom, 'polesAssocies:', director.polesAssocies);
      } else {
        console.warn('data.js: Director not found:', newPole.directeur);
      }
    }
    console.log('data.js: Successfully added pole', poleData);
  } catch (err) {
    console.error('data.js: Error adding pole:', err.message, err.stack);
    throw err;
  }
}

function savePolePassword(poleCode, password) {
  console.log(`data.js: Saving password for pole ${poleCode}`);
  const pole = poles.find(p => p.code === poleCode);
  if (!pole) {
    console.error('data.js: Pole not found:', poleCode);
    throw new Error(`Pôle avec le code ${poleCode} non trouvé.`);
  }
  pole.password = password;
  console.log(`data.js: Updated password for pole ${poleCode}`);
}

function deletePole(poleCode) {
  console.log(`data.js: Deleting pole ${poleCode}`);
  const poleIndex = poles.findIndex(p => p.code === poleCode);
  if (poleIndex === -1) {
    console.error('data.js: Pole not found:', poleCode);
    throw new Error(`Pôle avec le code ${poleCode} non trouvé.`);
  }
  const pole = poles[poleIndex];
  if (pole.directeur) {
    const director = directors.find(d => d.nom === pole.directeur);
    if (director) {
      director.polesAssocies = director.polesAssocies.filter(code => code !== poleCode);
      director.nombrePoles = director.polesAssocies.length;
      console.log('data.js: Updated director', director.nom, 'polesAssocies:', director.polesAssocies);
    }
  }
  pole.documents.forEach(docId => {
    delete documents[docId];
    console.log('data.js: Deleted document', docId);
  });
  const ntIndices = nts
    .map((nt, index) => (nt.pole === poleCode ? index : -1))
    .filter(index => index !== -1)
    .reverse();
  ntIndices.forEach(index => {
    console.log('data.js: Deleted NT', nts[index].nt);
    nts.splice(index, 1);
  });
  poles.splice(poleIndex, 1);
  console.log(`data.js: Successfully deleted pole ${poleCode}`);
}

function addNT(newNT) {
  console.log('data.js: Adding NT with data:', newNT);
  if (nts.find(n => n.nt === newNT.nt)) {
    console.error('data.js: Duplicate NT code:', newNT.nt);
    throw new Error(`NT avec le code ${newNT.nt} existe déjà.`);
  }
  nts.push({
    pole: newNT.pole,
    nt: newNT.nt,
    intituleNT: newNT.intituleNT
  });
  console.log('data.js: Successfully added NT', newNT.nt);
}

function addDirector(newDirector) {
  console.log('data.js: Adding director with data:', newDirector);
  if (directors.find(d => d.nom === newDirector.nom)) {
    console.error('data.js: Duplicate director name:', newDirector.nom);
    throw new Error(`Directeur avec le nom ${newDirector.nom} existe déjà.`);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newDirector.email)) {
    console.error('data.js: Invalid email format:', newDirector.email);
    throw new Error('Format d’email invalide.');
  }
  directors.push({
    nom: newDirector.nom,
    email: newDirector.email,
    telephone: newDirector.telephone,
    polesAssocies: newDirector.polesAssocies || [],
    nombrePoles: newDirector.polesAssocies ? newDirector.polesAssocies.length : 0
  });
  console.log('data.js: Successfully added director', newDirector.nom);
}

export {
  poles,
  directors,
  nts,
  documents,
  documentTypes,
  getDocumentsByPole,
  getDocumentById,
  getPoleByCode,
  addDocument,
  getPolesWithSubmissions,
  addPole,
  savePolePassword,
  deletePole,
  addNT,
  addDirector
};
