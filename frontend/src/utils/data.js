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
          'GESTION': 40,
          'ATELIER CHAUDRONNERIE': 35
        },
        activities: {
          'TERRASSEMENTS GENERAUX': [10, 5, 0, 0, 0]
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
          terrassementsGeneraux: { quantite: '1500', valeurKDA: '4500000' }
        }
      }
    },
    doc_006: {
      id: "doc_006",
      type: "recap_sortie_atelier",
      pole: "P101",
      data: {
        mois: "March 2024",
        atelierPrefa: 12.5,
        destinations: [
          { destination: "Chantier A", armatures: 5.2 }
        ]
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
            items: [
              {
                name: "FOURNITURES DE BUREAU",
                unit: "DA",
                quantity: 15
              }
            ]
          }
        ]
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
          installationPanneaux: { quantite: '200', valeurKDA: '3000000' }
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
              {
                name: "PANNEAUX PHOTOVOLTAIQUES",
                unit: "Unité",
                quantity: 50
              }
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
        structures: {
          'GESTION': 50,
          'ATELIER CONSTRUCTION': 45
        },
        activities: {
          'CONSTRUCTION BARRAGE': [15, 10, 5, 0, 0]
        }
      }
    },
    doc_010: {
      id: "doc_010",
      type: "recap_sortie_atelier",
      pole: "P102",
      data: {
        mois: "April 2024",
        atelierPrefa: 15.0,
        destinations: [
          { destination: "Chantier B", armatures: 7.8 }
        ]
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
    console.log('addPole called with:', newPole);
    if (poles.find(p => p.code === newPole.code)) {
      throw new Error(`Pole with code ${newPole.code} already exists`);
    }
    poles.push({
      code: newPole.code,
      intitule: newPole.intitule,
      directeur: newPole.directeur,
      commune: newPole.commune,
      wilaya: newPole.wilaya,
      documents: [],
      password: `${newPole.code}Secure` // Generate simple password
    });
    const director = directors.find(d => d.nom === newPole.directeur);
    if (director) {
      director.polesAssocies.push(newPole.code);
      director.nombrePoles = director.polesAssocies.length;
    }
    console.log(`Added pole ${newPole.code}:`, poles);
  }
  
  function addNT(newNT) {
    console.log('addNT called with:', newNT);
    if (nts.find(n => n.nt === newNT.nt)) {
      throw new Error(`NT with code ${newNT.nt} already exists`);
    }
    nts.push({
      pole: newNT.pole,
      nt: newNT.nt,
      intituleNT: newNT.intituleNT
    });
    console.log(`Added NT ${newNT.nt}:`, nts);
  }
  
  function addDirector(newDirector) {
    console.log('addDirector called with:', newDirector);
    if (directors.find(d => d.nom === newDirector.nom)) {
      throw new Error(`Director with name ${newDirector.nom} already exists`);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newDirector.email)) {
      throw new Error('Invalid email format');
    }
    directors.push({
      nom: newDirector.nom,
      email: newDirector.email,
      telephone: newDirector.telephone,
      polesAssocies: newDirector.polesAssocies,
      nombrePoles: newDirector.polesAssocies.length
    });
    console.log(`Added director ${newDirector.nom}:`, directors);
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
    addNT,
    addDirector
  };