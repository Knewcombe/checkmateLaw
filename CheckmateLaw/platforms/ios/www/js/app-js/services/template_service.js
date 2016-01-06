angular.module("app").factory('TemplateService', function($http) {
    var data = [
        {
            name: 'Break and Enter',
            questions:
                [
                    {
                        id: 1,
                        text: 'Initial Complaint',
                        type: 'header',
                        entryType: 'text',
                        state: 'false',
                        subQuestions: [
                            {
                                id: 1,
                                text: 'Who the caller is? (Tombstone Data, ie: Full Name, DOB, Address, Phone #)',
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 2,
                                text: 'Is B&E in progress or not?',
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 3,
                                text: 'Caller\'s relationship to property broken into (Owner, property rep, keyholder, family, friend, passerby, etc...)',
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 4,
                                text: 'Who owns the property?',
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 5,
                                text: 'Who noticed the B&E?',
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 6,
                                text: 'Did anyone enter? If yes, who and what path did they take?',
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 7,
                                text: 'Did anyone touch anything? If so, what?',
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 8,
                                text: 'Who will be on scene when police/investigator attend?',
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 9,
                                text: 'Did they notice anyone suspicious in the area?',
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 10,
                                text: 'Any suspects, witnesses or physical evidence?',
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 11,
                                text: 'Tell caller not to let anyone near the scene until police arrive.',
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            }
                        ]
                    },
                    {
                        id: 2,
                        text: 'First Responder & Scene Examination',
                        type: 'header',
                        entryType: 'text',
                        state: 'false',
                        subQuestions: [
                            {
                                id: 1,
                                text: 'Anybody fleeing scene while enroute? On foot, in vehicle?',
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 2,
                                text: 'Confirm B&E with whoever reported it',
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 3,
                                text: 'Secure scene',
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 4,
                                text: 'Find out who victim/owner of property is',
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 5,
                                text: 'Document the crime scene as you found it',
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 6,
                                text: 'Any suspect foot prints or tire impressions outside building (flight path)',
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 7,
                                text: 'Confirm if scene was disturbed, by who, when, and where did they go?',
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 8,
                                text: 'Take names of everyone on scene',
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 9,
                                text: 'Determine force used to enter property',
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 10,
                                text: 'Determine if Forensic Identification Section required',
                                type: 'radio',
                                additional: [
                                    {text: 'Do fingerprints need to be lifted from secured objects?'},
                                    {text: 'Shoe or foot impressions off of secured objects'},
                                    {text: 'Severity of B&E (Value, victims on scene during, has there been a rash of breaks lately, etc...)'},
                                    {text: 'Need for more professional photographs - Likelihood of fingerprints/footprints/shoe impressions being lifted (dusty surfaces, smeared prints, gloves being used, etc...)'},
                                    {text: 'Tire impressions'},
                                    {text: 'DNA left behind (broken glass, cigarette butts, urine, feces, saliva, etc...)'}
                                ],
                                entryType: 'text',
                                state: false,
                                trueQuestions: [
                                    {
                                        id: 1,
                                        text: 'Keep scene secure',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 2,
                                        text: 'Cover outside evidence until identification section attends',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 3,
                                        text: 'Begin taking statements',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    }
                                ],
                                falseQuestions: [
                                    {
                                        id: 1,
                                        text: 'Determine if Police Dog Services are required',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 2,
                                        text: 'Determine if other special units are required/available. (B&E section, General - Investigation Section, etc...)',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 3,
                                        text: 'Search perimeter for evidence (footprints in mud, dirt, snow, flower beds, tire impressions, tools used to break in, suspects clothing/disguises, cigarette butts, etc...',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 4,
                                        text: 'When was scene found broken into (Date and time)',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 5,
                                        text: 'What was the point of entry?',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 6,
                                        text: 'Method of entry?',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 7,
                                        text: 'Footprints/shoe impressions inside property?',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 8,
                                        text: 'What path did perpetrator take? Inside and out.',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 9,
                                        text: 'Any other points of contact made by suspect? (Some suspects have been known to use the bathroom, eat and/or drink on scene)',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 10,
                                        text: 'What was stolen? Make, Model, serial#\'s, description, color, value, number of items taken, receipts',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 11,
                                        text: 'Describe items without serial numbers with great detail . include defects and other identifiers',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 12,
                                        text: 'Try to obtain photos of stolen items from victim',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 13,
                                        text: 'Where were stolen items locted prior to removal?',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 14,
                                        text: 'Was anything disturbed or touched?',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 15,
                                        text: 'Is there physical evidence? (fingerprints, damaged items, foot/shoe impressions, broken glass, clothing, gloves, trace fibres, paint chips, etc...)',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 16,
                                        text: 'Is there signs of any unusual suspect behavior? (drinking alcohol, smoking, burning matches, defecation, handling of female undergarments, made themselves at home, urination,  sed gloves, mask, telephone, tissue/towels, weapons, graffiti, vandalism?',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 17,
                                        text: 'Photograph and describe any evidence that you cannot take',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 18,
                                        text: 'Can physical evidence be seized? (items possibly handled or disturbed ie. Papers, removable drawers, screens, tools, etc...)',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 19,
                                        text: 'Take samples of material that might match the evidence on a suspect',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 20,
                                        text: 'Point of exit',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 21,
                                        text: 'Photograph scene including POE\'s, pathway, where stolen items taken from, damages, any type of impressions (tire, foot, fingerprints), any physical evidence, rest of property,  etc...',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 22,
                                        text: 'Is there surveillance video available?',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 23,
                                        text: 'Is there an alarm and was the phone line cut?',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 24,
                                        text: 'If there was an alarm was it activated or disabled? When?',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 25,
                                        text: 'Were locks plugged with anything?',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 26,
                                        text: 'Determine timeline (when last person attended the property prior to break, first person to arrive after break)',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 27,
                                        text: 'Neighborhood inquiries to find out if anyone suspicious in area prior to break or in the past, noises heard, did they notice any lights on, what time they went to bed and woke up, likelyhood of hearing or seeing break.',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 28,
                                        text: 'Take detailed notes',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 3,
                        text: 'Statements',
                        type: 'header',
                        entryType: 'text',
                        state: 'false',
                        subQuestions: [
                            {
                                id:1,
                                text: "Victim(s)",
                                type: 'header',
                                entryType: 'text',
                                state: 'false',
                                subQuestions: [
                                    {
                                        id: 1,
                                        text: "Tombstone data (Full name, DOB, Address, Ph#)",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 2,
                                        text: "Determine timeline (when property was last scene prior to break, when break was noticed, by whom?",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 3,
                                        text: "Was property secured?",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 4,
                                        text: "State property was left in prior to break. (floors and counters just cleaned, preparing for seasonal use, etc...)",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 5,
                                        text: "Did they make any changes to the scene before the police arrived?",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 6,
                                        text: "What is at the scene that normally wouldn't be there?",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 7,
                                        text: "What was damaged?",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 8,
                                        text: "What was stolen? (Make, model, description, current or original value ($), serial numbers)",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 9,
                                        text: "Does anyone else have access to property? (possible suspects, witnesses for elimination prints, past or present employees/keyholders, etc...)",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 10,
                                        text: "Do they suspect anyone?",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 11,
                                        text: "Any prior issues with friends, family, aquaintances, employees past or present, neighbors, etc... Unusual loiterers, visitors, parked cars, or phone calls before the break and enter?",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 12,
                                        text: "Who would have had the opportunity to act?",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 13,
                                        text: "Any previous B&E's at the property or other properties owned by the victim(s)?",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 14,
                                        text: "Possibility of inside job",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 15,
                                        text: "If it is a business, name of employees",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 16,
                                        text: "Would employees be willing to fill out view questionaire or agree to polygraph?",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 17,
                                        text: "Insurance company and if there will be a claim",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 18,
                                        text: "Is the victim a suspect for insurance fraud? (read rights)",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 19,
                                        text: "Does the victim have an alibi and who can confirm",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 20,
                                        text: "Do you need to move into an interrogation?",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 21,
                                        text: "Would the victim be willing to take a polygraph?",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    }

                                ]
                            },
                            {
                                id:2,
                                text: "Witness",
                                type: 'header',
                                entryType: 'text',
                                state: 'false',
                                subQuestions: [
                                    {
                                        id: 1,
                                        text: "Tombstone Data",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 2,
                                        text: "Relationship to property/victim",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 3,
                                        text: "Determine Timeline (Who was last to attend property and first to find property broken into)",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 4,
                                        text: "What they witnessed ie: Suspects, other witnesses, scene, stolen items, etc... (will vary depending on witness involvement)",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 5,
                                        text: "If they witnessed suspects, provide detail description of suspect and clothing, where they saw suspect, how suspect fled the scene, etc...)",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 6,
                                        text: "Who they suspect as being involved and why?",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 7,
                                        text: "Any knowledge of what was stolen (description, value, serial numbers, etc...)",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 8,
                                        text: "Is information provided reliable (how and why?)",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 9,
                                        text: "Any other pertinent information that can be provided (will vary from witness to witness)",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 4,
                        text: 'Follow Up',
                        type: 'header',
                        entryType: 'text',
                        state: 'false',
                        subQuestions: [
                            {
                                id: 1,
                                text: "Determine Modus Operandi (is this crime similar to others in the area?)",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 2,
                                text: "Check prior B&E's for suspects and suspect vehicles",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 3,
                                text: "Add all stolen items and serial numbers to CPIC (NCIC in US)",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 4,
                                text: "Contact Owner/victim/witnesses to see if they have any new avenues to follow up with",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 5,
                                text: "Contact pawn shops to see if stolen items have been pawned",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 6,
                                text: "Canvass sources for information",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 7,
                                text: "Media release",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 8,
                                text: "Email to other members not working and other detachments or police forces, as well as other intelligence sections working on similar files",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 9,
                                text: "Complete required documents (Occurrence reports, exhibit reports, forensic identification requests, enter all data, photos, statements, notes, receipts, referral forms, CPIC printouts added to file)",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 10,
                                text: "Contact criminal intelligence section to see if rash of B&E's or if there are suspects in other files that meet MO",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 11,
                                text: "Keep eye out for other possible related B&E or suspects",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 12,
                                text: "Have other members to question any detained clients with regards to this crime",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 13,
                                text: "Determine if stolen electronics (Smart phones, laptops, ipads, etc...) can be tracked via GPS",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 14,
                                text: "Solveability factors",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 15,
                                text: "Have any physical evidence analyzed",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            }
                        ]
                    }
                ],
            dateStamp: ''
        },
        {
            name:"Homicide",
            questions:
                [
                    {
                        id:1,
                        text: 'First Responder',
                        type: 'header',
                        entryType: 'text',
                        state: 'false',
                        subQuestions: [
                            {
                                id:1,
                                text:'Arrival at Scene:',
                                type:'header',
                                entryType: 'text',
                                state: 'false',
                                subQuestions:[
                                    {
                                        id: 1,
                                        text: "Enter scene by route least likely to disturb evidence, note route traveled.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 2,
                                        text: "Check victim for signs of life (breathing, neck area for pulse).",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 3,
                                        text: "Note time of arrival",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    }
                                ]
                            },
                            {
                                id:2,
                                text:'Living Victim',
                                type:'header',
                                entryType: 'text',
                                state: 'false',
                                subQuestions:[
                                    {
                                        id: 1,
                                        text: "Call for medical assistance",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 2,
                                        text: "Make note of any dying declarations",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 3,
                                        text: "Who did this to you?",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 4,
                                        text: "If name of suspect not known to victim, obtain descriptors of suspect: man, woman, race, height, weight, color of hair, eyes, type of clothing, etc.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 5,
                                        text: "Establish the fact that the victim knows that he/she is dying.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    }
                                ]
                            },
                            {
                                id:3,
                                text:'Unconscious Victim',
                                type:'header',
                                entryType: 'text',
                                state: 'false',
                                subQuestions:[
                                    {
                                        id: 1,
                                        text: "If victim unconscious on arrival at scene, Ensure police officer stays with victim at all times, Including the trip to the hospital to ensure any dying declarations are noted",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 2,
                                        text: "Upon arrival at hospital alert medical personnel to possibility of dying declarations. Request them to note same",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    }
                                ]
                            },
                            {
                                id:4,
                                text:'Removal of Victim from Scene',
                                type:'header',
                                entryType: 'text',
                                state: 'false',
                                subQuestions:[
                                    {
                                        id: 1,
                                        text: "If possible, photograph victim\'s position at scene before removal.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 2,
                                        text: "If time and circumstance do not permit photos before victim is removed carefully note the position of the victim in your notebook",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 3,
                                        text: "Obtain physical evidence from victim",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 4,
                                        text: "Officer accompanying victim to hospital should collect victim\'s clothing and personal effects as they become available.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 5,
                                        text: "Officer receiving items should carefully note time received and the identity of person from whom items were received.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 6,
                                        text: "For continuity purposes, items handled by physicians, nurses should be marked by those persons and note any changes of possession. This is particularly important with items such as bullets, etc. ",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: [],
                                        additional: [
                                            {text: "NOTE: - A failure to follow up on collecting items that left the crime scene with the victim may cause continuity issues and render them useless as evidence."}
                                        ]
                                    }
                                ]
                            },
                            {
                                id:5,
                                text:'Notify Command of Situation',
                                type:'header',
                                entryType: 'text',
                                state: 'false',
                                subQuestions:[
                                    {
                                        id: 1,
                                        text: "Update command or telecoms operators at earliest convenience",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 2,
                                        text: "Request assistance for Forensic identification section, major crimes sections, other specialized units available.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 3,
                                        text: "Notify or request notification of Crown Prosecutor representative",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: [],
                                        additional: [
                                            {text: "(Only for legal questions, do  not allow a lawyer to get involved in the actual investigation. Their training limits them to the providing advise on legal issues only)"}
                                        ]
                                    },
                                    {
                                        id: 4,
                                        text: "Notify or request notification of medical examiner.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    }
                                ]
                            },
                            {
                                id:6,
                                text:'Secure Scene',
                                type:'header',
                                entryType: 'text',
                                state: 'false',
                                subQuestions:[
                                    {
                                        id: 1,
                                        text: "Block or tape off scene (Bigger is better).",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 2,
                                        text: "Clear unauthorized person from the scene.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: [],
                                        additional: [
                                            {text: "NOTE: You cannot worry about hurting someone\'s feelings. If they do not belong tell them to leave. This must include any unauthorized police command."}
                                        ]
                                    },
                                    {
                                        id: 3,
                                        text: "Prevent anyone from touching the body or disturbing anything pending the arrival of the medical examiner, identification personnel,and investigative officers.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    }
                                ]
                            },
                            {
                                id:7,
                                text:'Witnesses',
                                type:'header',
                                entryType: 'text',
                                state: 'false',
                                subQuestions:[
                                    {
                                        id: 1,
                                        text: "Note name, address and phone numbers of persons present.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 2,
                                        text: "Obtain brief statement from each person present.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 3,
                                        text: "Hold witnesses until arrival of investigators.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 4,
                                        text: "Keep Witnesses separate to prevent conversation.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 5,
                                        text: "Prevent Destruction of fragile evidence such as footprints, tire tracks, etc.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    }
                                ]
                            },
                            {
                                id:8,
                                text:'Process Scene',
                                type:'header',
                                entryType: 'text',
                                state: 'false',
                                subQuestions:[
                                    {
                                        id: 1,
                                        text: "Be aware that there are search and seizure issues in this area. If in doubt you may wish to contact your crown prosecutor regarding a warrant or other advise.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 2,
                                        text: "At night - Obtain adequate lighting before scene processing commences. Artificial lighting used must be adequate for photography and for minute detail search for items such as hair, cartridge cases, etc.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 3,
                                        text: "WHEN LIGHTING NOT AVAILABLE - secure scene with a guard and wait for daylight before proceeding with examination of the scene",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 4,
                                        text: "Identification Personnel (Specialized Investigators) Note time of arrival",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 5,
                                        text: "Note weather conditions, especially at outside crime scenes.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 6,
                                        text: "Check perimeter of scene to insure that all of scene is secured.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 7,
                                        text: "Obtain summary of situation from officer in charge.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 8,
                                        text: "Photograph scene from all angles ",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 9,
                                        text: "Work from the perimeter to center.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 10,
                                        text: "Include photographs of entrance, exit routes to scene.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 11,
                                        text: "REMEMBER - There is no such thing as too many photographs of a crime scene. Make sure that all possible locations relevant to scene are photographed. Particularly important that all rooms at scene are photographed.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 12,
                                        text: "REMEMBER - Something may have happened in an adjoining room that will be of critical importance as the investigation develops.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 13,
                                        text: "Photograph all physical evidence such as footprints, weapons, etc. as observed in place at scene. Where scale is important (footprints, tire tracks use ruler scale to show size).",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 14,
                                        text: "Overhead photographs should be taken of outdoor scenes, including streets, intersections. These can be invaluable in constructing scale representation of scene. Extension ladders, power company and fire trucks should be utilized for this purpose.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 15,
                                        text: "Video tape recordings should be made of scene where possible. Include video tape shots of collecting evidence, examining victim at scene. Also video tape suspect, witnesses.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 16,
                                        text: "Color photographs should be taken of victim from all angles.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 17,
                                        text: "Photograph the victim as items are removed from body, identification, clothing, etc.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 18,
                                        text: "Photograph substances on body and clothing of victim such as blood, seminal fluid, powder residue, etc. These should include full length and close-ups.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 19,
                                        text: "Photograph wounds, injuries - include close-ups. This should be done step by step as body examined, disrobed by medical examiner at scene.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 20,
                                        text: "Make careful note of following:",
                                        type: 'header',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: [],
                                        subQuestions: [
                                            {
                                                id: 1,
                                                text: "Position of body",
                                                entryType: 'text',
                                                state: 'false',
                                                notes: '',
                                                photos: [],
                                                memos: []
                                            },
                                            {
                                                id: 2,
                                                text: "Position, condition of clothing",
                                                entryType: 'text',
                                                state: 'false',
                                                notes: '',
                                                photos: [],
                                                memos: []
                                            },
                                            {
                                                id: 3,
                                                text: "Location of substances on the victim and his clothing",
                                                entryType: 'text',
                                                state: 'false',
                                                notes: '',
                                                photos: [],
                                                memos: []
                                            },
                                            {
                                                id: 4,
                                                text: "Any change of victim's body position before your arrival as determined from witnesses or officers.",
                                                entryType: 'text',
                                                state: 'false',
                                                notes: '',
                                                photos: [],
                                                memos: []
                                            },
                                            {
                                                id: 5,
                                                text: "Take careful measurements of the scene. Measure each room in a house (NOTE: it is very hard to return later to a scene if you do not have a warrant). Use a reference point that is permanent",
                                                entryType: 'text',
                                                state: 'false',
                                                notes: '',
                                                photos: [],
                                                memos: []
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id:2,
                        text: 'Search of Scene',
                        type: 'header',
                        entryType: 'text',
                        state: 'false',
                        subQuestions: [
                            {
                                id:1,
                                text:'The Victim',
                                type:'header',
                                entryType: 'text',
                                state: 'false',
                                subQuestions:[
                                    {
                                        id: 1,
                                        text: "Before removing examine the victim for physical evidence (Example: loose hairs, fibers, etc.)",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 2,
                                        text: "Place victim on a cloth sheet, move body shortest possible distance.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 3,
                                        text: "Examine the ground underneath the victim",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 4,
                                        text: "Examine the victim for additional physical evidence that may become visible after movement.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 5,
                                        text: "Collect physical evidence from the victim to include personal effects, clothing, shoes, weapons, etc.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    }
                                ]
                            },
                            {
                                id:2,
                                text:'Scene Area',
                                type:'header',
                                entryType: 'text',
                                state: 'false',
                                subQuestions:[
                                    {
                                        id: 1,
                                        text: "Organize scene search by adopting specific plan, assign tasks,areas of search to individual officers.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 2,
                                        text: "Assign ONE officer as exhibit custodian",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 3,
                                        text: "Execute search by carefully following plan of assigned tasks.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 4,
                                        text: "Note, mark and photograph location of objects found such as latent fingerprints, footprints, tire tracks, tool marks, hair, fragments of cloth, buttons, cigarette butts, cartridge cases, bullet holes, bullets, bloodstains, other weapons etc. Collect, mark evidence.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 5,
                                        text: "REMEMBER - When collecting evidence DO NOT overlook such items as room furniture, doors, etc. that can be used to reconstruct crime scene in court.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 6,
                                        text: "Preserve items of evidence separately",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 7,
                                        text: "Use correct container - molded plastic container for blood. Paper bindle for hair or fiber. Paper bag for bloody items. Never put evidence that may decompose or deteriorate into a plastic bag.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 8,
                                        text: "Have evidence examined, if there are any extra tests you want conducted, advise the lab of those tests to be conducted",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id:3,
                        text: 'Process Suspect',
                        type: 'header',
                        entryType: 'text',
                        state: 'false',
                        subQuestions: [
                            {
                                id: 1,
                                text: "Photograph Suspect",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 2,
                                text: "Show any injuries or lack of injuries",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 3,
                                text: "Show his clothing and general appearance",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 4,
                                text: "Show hands (both sides)",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 5,
                                text: "Show any tattoos or scars",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 6,
                                text: "Take any evidence that you can seize",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 7,
                                text: "Pubic combing if a rape case",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 8,
                                text: "Any item that is on the clothing and could be lost",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 9,
                                text: "Obtain warrant for blood and hair samples",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            }
                        ]
                    },
                    {
                        id:4,
                        text: 'Autopsy Processing',
                        type: 'header',
                        entryType: 'text',
                        state: 'false',
                        subQuestions: [
                            {
                                id: 1,
                                text: "Arrange through the medical examiner the transportation of the victim to morgue.",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 2,
                                text: "Medical Examiner investigator or police officer should be present during the autopsy",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 3,
                                text: "If possible before autopsy take finger and palm prints of the victim. If not then once the autopsy is completed get the prints.",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 4,
                                text: "Pick up any evidence that was obtained during the autopsy (blood samples, hair samples, fingernail scrapings, bullets)",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 5,
                                text: "Place each item in a separate container. Paper bags are best. Each container should be marked, dated and initialed.",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            }
                        ]
                    },
                    {
                        id:5,
                        text: 'Investigate Personnel',
                        type: 'header',
                        entryType: 'text',
                        state: 'false',
                        subQuestions: [
                            {
                                id: 1,
                                text: "Obtain summary of situation from officer at scene.",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 2,
                                text: "Check scene security and take steps necessary to correct errors or omissions, if any.",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 3,
                                text: "Review all actions of officers on the scene",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 4,
                                text: "Initiate Investigation from the beginning",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 5,
                                text: "Determine identity of the victim",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 6,
                                text: "Identification on the victim",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 7,
                                text: "Relatives",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 8,
                                text: "Witnesses",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 9,
                                text: "Fingerprints",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            }
                        ]
                    },
                    {
                        id:6,
                        text: 'Scene Reconstruction',
                        type: 'header',
                        entryType: 'text',
                        state: 'false',
                        subQuestions: [
                            {
                                id: 1,
                                text: "Position of body",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 2,
                                text: "Number, location of wounds",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 3,
                                text: "Trajectory of bullets",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 4,
                                text: "Bloodstains, substances",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 5,
                                text: "Other signs of violence",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 6,
                                text: "Other physical evidence at scene",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            }
                        ]
                    },
                    {
                        id:7,
                        text: 'Organize Investigation',
                        type: 'header',
                        entryType: 'text',
                        state: 'false',
                        subQuestions: [
                            {
                                id: 1,
                                text: "Assign specific tasks to individual officers.",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 2,
                                text: "Supervise execution of assigned tasks.",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 3,
                                text: "Receive, Record and Index information received from investigators",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 4,
                                text: "Establish case book to include the following:",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: [],
                                additional: [
                                    {text: "i. Index of contents ii. Initial reports"},
                                    {text: "iii. Follow up reports"},
                                    {text: "iv. Evidence reports"},
                                    {text: "v. Medical reports"},
                                    {text: "vi. Witness statements"},
                                    {text: "vii. Suspect's statements"},
                                    {text: "viii. Background on the suspect"},
                                    {text: "ix. Background on the victim"},
                                    {text: "x. Evidence Log Book"},
                                    {text: "xi Books of photographs"},
                                    {text: "Provide Copies of case book for"},
                                    {text: "I. Principal investigators"},
                                    {text: "ii. Crown Prosecutor's office"},
                                    {text: "iii. Defense counsel"},
                                    {text: ". Keep case book current by distributing new reports, etc., as available Communicate information"},
                                    {text: "I. To you investigators"},
                                    {text: "ii. To other agencies"}
                                ]
                            }
                        ]
                    },
                    {
                        id:8,
                        text: 'Statements',
                        type: 'header',
                        entryType: 'text',
                        state: 'false',
                        subQuestions: [
                            {
                                id:1,
                                text:'Suspect',
                                type:'header',
                                entryType: 'text',
                                state: 'false',
                                subQuestions:[
                                    {
                                        id: 1,
                                        text: "Read Charter of Rights, Police Caution using card.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 2,
                                        text: "Have Suspect initial or sign rights card or get a verbal acknowledgment that the suspect understands rights.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 3,
                                        text: "Video tape or record the suspect's statement",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 4,
                                        text: "Your choice if you tell suspect he/she is being recorded.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 5,
                                        text: "Turn tape from the start.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 6,
                                        text: "Questions should be designed to answer the unanswered questions that you have about the case.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 7,
                                        text: "If lawyer is present you must control the interview.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    }
                                ]
                            },
                            {
                                id:2,
                                text:'Witnesses',
                                type:'header',
                                entryType: 'text',
                                state: 'false',
                                subQuestions:[
                                    {
                                        id: 1,
                                        text: "Use your discretion as to video a witness or not.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 2,
                                        text: "Do tape if witness is reluctant",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 3,
                                        text: "Not necessary if witness is cooperative",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 4,
                                        text: "Establish movements of the victim prior to death to determine:",
                                        type: 'header',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: [],
                                        subQuestions:[
                                            {
                                                id: 1,
                                                text: "a. Time last seen alive",
                                                entryType: 'text',
                                                state: 'false',
                                                notes: '',
                                                photos: [],
                                                memos: []
                                            },
                                            {
                                                id: 2,
                                                text: "b. Who with",
                                                entryType: 'text',
                                                state: 'false',
                                                notes: '',
                                                photos: [],
                                                memos: []
                                            },
                                            {
                                                id: 3,
                                                text: "c. What doing",
                                                entryType: 'text',
                                                state: 'false',
                                                notes: '',
                                                photos: [],
                                                memos: []
                                            },
                                            {
                                                id: 4,
                                                text: "d. Location",
                                                entryType: 'text',
                                                state: 'false',
                                                notes: '',
                                                photos: [],
                                                memos: []
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id:9,
                        text: 'Follow Up',
                        type: 'header',
                        entryType: 'text',
                        state: 'false',
                        subQuestions: [
                            {
                                id:1,
                                text:'Examine the victim\'s background, including the following:',
                                type:'header',
                                entryType: 'text',
                                state: 'false',
                                subQuestions:[
                                    {
                                        id: 1,
                                        text: "a. Relatives",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 2,
                                        text: "b. Friends",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 3,
                                        text: "c. Employment",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 4,
                                        text: "d. Possible criminal record or activities",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 5,
                                        text: "e. Finances",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 6,
                                        text: "f. Possible romantic involvements",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 7,
                                        text: "g. Possible drug use",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 8,
                                        text: "h. Gang involvement",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    }
                                ]
                            },
                            {
                                id:2,
                                text:'Motive',
                                type:'header',
                                entryType: 'text',
                                state: 'false',
                                subQuestions:[
                                    {
                                        id: 1,
                                        text: "A. Consider the victim's background",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 2,
                                        text: "B. View scene information for evidence indicating motives such as:",
                                        type: 'header',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: [],
                                        subQuestions: [
                                            {
                                                id: 1,
                                                text: "a. Sex",
                                                entryType: 'text',
                                                state: 'false',
                                                notes: '',
                                                photos: [],
                                                memos: []
                                            },
                                            {
                                                id: 2,
                                                text: "b. Theft of money or Property",
                                                entryType: 'text',
                                                state: 'false',
                                                notes: '',
                                                photos: [],
                                                memos: []
                                            },
                                            {
                                                id: 3,
                                                text: "c. Drugs",
                                                entryType: 'text',
                                                state: 'false',
                                                notes: '',
                                                photos: [],
                                                memos: []
                                            },
                                            {
                                                id: 4,
                                                text: "d. Mental Health issues",
                                                entryType: 'text',
                                                state: 'false',
                                                notes: '',
                                                photos: [],
                                                memos: []
                                            },
                                            {
                                                id: 5,
                                                text: "e. Hate Crime",
                                                entryType: 'text',
                                                state: 'false',
                                                notes: '',
                                                photos: [],
                                                memos: []
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                id:3,
                                text:'Suspects actions prior to offence',
                                type:'header',
                                entryType: 'text',
                                state: 'false',
                                subQuestions:[
                                    {
                                        id: 1,
                                        text: "A. You may be required to cover period days, weeks or months before homicide, depending on circumstances, including motive.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 2,
                                        text: "B. Pay attention to any unusual actions of suspect, trips, absences from work, home, etc.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 3,
                                        text: "C. Cover any activities such as surveillance of victim, purchase of weapons, etc.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    }
                                ]
                            },
                            {
                                id:4,
                                text:'Determine actions of suspect after homicide',
                                type:'header',
                                entryType: 'text',
                                state: 'false',
                                subQuestions:[
                                    {
                                        id: 1,
                                        text: "A. Fight",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 2,
                                        text: "B. Destruction or concealment of:",
                                        type:'header',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: [],
                                        subQuestions: [
                                            {
                                                id: 1,
                                                text: "a. Clothing worn at crime scene",
                                                entryType: 'text',
                                                state: 'false',
                                                notes: '',
                                                photos: [],
                                                memos: []
                                            },
                                            {
                                                id: 2,
                                                text: "b. Weapons used",
                                                entryType: 'text',
                                                state: 'false',
                                                notes: '',
                                                photos: [],
                                                memos: []
                                            },
                                            {
                                                id: 3,
                                                text: "c. Vehicles used (including cleaning of same to remove bloodstains, etc.)",
                                                entryType: 'text',
                                                state: 'false',
                                                notes: '',
                                                photos: [],
                                                memos: []
                                            }
                                        ]
                                    }

                                ]
                            },
                            {
                                id:5,
                                text:'Practical Tips',
                                type:'header',
                                entryType: 'text',
                                state: 'false',
                                subQuestions:[
                                    {
                                        id: 1,
                                        text: "A. Call upon experienced investigators to assist.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 2,
                                        text: "B. Question thoroughly those concerned.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 3,
                                        text: "C. Be careful in questioning witnesses- they may turn to out to be involved in the crime.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 4,
                                        text: "D. Do not divulge critical information carelessly to witnesses - it may get back to the defense and you may end up with what you have told the witness instead of what he actually knows about the event.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 5,
                                        text: "E. Separate witnesses",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 6,
                                        text: "F. Confer with your co-workers.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 7,
                                        text: "G. Cooperate with fellow officers",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 8,
                                        text: "H. Be courteous and tactful.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 9,
                                        text: "I. Give constant attention to dissemination of pertinent information to other agencies.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 10,
                                        text: "J. Do no disclose valuable information to press or unauthorized persons.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 11,
                                        text: "J. Do no disclose valuable information to press or unauthorized persons.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id:10,
                        text: 'Report Writing',
                        type: 'header',
                        entryType: 'text',
                        state: 'false',
                        subQuestions: [
                            {
                                id: 1,
                                text: "A. Facts of case must be reported. No investigation regardless of how competently executed is complete unless accurately reported.",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: []
                            },
                            {
                                id: 2,
                                text: "B. Contents of Report must include at least the following:",
                                entryType: 'text',
                                state: 'false',
                                notes: '',
                                photos: [],
                                memos: [],
                                subQuestions: [
                                    {
                                        id: 1,
                                        text: "A. Summary - A brief, concise summary of operative case facts at beginning of report. This puts case in narrative form, enables reader to grasp picture before examining balance of report for details, witnesses statements. Summary should not contain verbatim recital of witnesses statements.",
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: []
                                    },
                                    {
                                        id: 2,
                                        text: "B. List of Evidence - List items seized, using consecutive numbers for each individual item. Specify following:",
                                        type: 'header',
                                        entryType: 'text',
                                        state: 'false',
                                        notes: '',
                                        photos: [],
                                        memos: [],
                                        subQuestions: [
                                            {
                                                id: 1,
                                                text: "a. What",
                                                entryType: 'text',
                                                state: 'false',
                                                notes: '',
                                                photos: [],
                                                memos: []
                                            },
                                            {
                                                id: 2,
                                                text: "b. Where seized",
                                                entryType: 'text',
                                                state: 'false',
                                                notes: '',
                                                photos: [],
                                                memos: []
                                            },
                                            {
                                                id: 3,
                                                text: "c. From whom",
                                                entryType: 'text',
                                                state: 'false',
                                                notes: '',
                                                photos: [],
                                                memos: []
                                            },
                                            {
                                                id: 4,
                                                text: "d. Where stored",
                                                entryType: 'text',
                                                state: 'false',
                                                notes: '',
                                                photos: [],
                                                memos: []
                                            },
                                            {
                                                id: 5,
                                                text: "e. Action taken - Specify if item given to lab personnel for testing, and, if so, to whom.",
                                                entryType: 'text',
                                                state: 'false',
                                                notes: '',
                                                photos: [],
                                                memos: []
                                            },
                                            {
                                                id: 6,
                                                text: "f. Action Needed - Specify any processing remaining to be done such as latent prints, lab testing, etc.",
                                                entryType: 'text',
                                                state: 'false',
                                                notes: '',
                                                photos: [],
                                                memos: []
                                            },
                                            {
                                                id: 7,
                                                text: "g. List of witnesses with brief statement of what testimony concerns; connection with case.",
                                                entryType: 'text',
                                                state: 'false',
                                                notes: '',
                                                photos: [],
                                                memos: []
                                            },
                                            {
                                                id: 8,
                                                text: "h. Witnesses Statements",
                                                entryType: 'text',
                                                state: 'false',
                                                notes: '',
                                                photos: [],
                                                memos: []
                                            },
                                            {
                                                id: 9,
                                                text: "i. Do not include:",
                                                entryType: 'text',
                                                state: 'false',
                                                notes: '',
                                                photos: [],
                                                memos: [],
                                                subQuestions: [
                                                    {
                                                        id: 1,
                                                        text: "i. Your opinions concerning the value of case.",
                                                        entryType: 'text',
                                                        state: 'false',
                                                        notes: '',
                                                        photos: [],
                                                        memos: []
                                                    },
                                                    {
                                                        id: 2,
                                                        text: "ii. Irrelevant Material",
                                                        entryType: 'text',
                                                        state: 'false',
                                                        notes: '',
                                                        photos: [],
                                                        memos: []
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
        },
        {
            name:"Sudden Death",
            questions:[
                {
                    id: 1,
                    text: 'Initial Complaint',
                    type: 'header',
                    entryType: 'text',
                    state: 'false',
                    subQuestions:[
                        {
                            id: 1,
                            text: "Obtain tombstone data from Complainant, Full Name, DOB, Address, Phone number",
                            entryType: 'text',
                            state: 'false',
                            notes: '',
                            photos: [],
                            memos: []
                        },
                        {
                            id: 2,
                            text: "Who is the victim?, Full Name, DOB, Address, Phone number",
                            entryType: 'text',
                            state: 'false',
                            notes: '',
                            photos: [],
                            memos: []
                        },
                        {
                            id: 3,
                            text: "Marital status",
                            entryType: 'text',
                            state: 'false',
                            notes: '',
                            photos: [],
                            memos: []
                        },
                        {
                            id: 4,
                            text: "Employment status",
                            entryType: 'text',
                            state: 'false',
                            notes: '',
                            photos: [],
                            memos: []
                        },
                        {
                            id: 5,
                            text: "Criminal Record",
                            entryType: 'text',
                            state: 'false',
                            notes: '',
                            photos: [],
                            memos: []
                        },
                        {
                            id: 6,
                            text: "Ethnicity",
                            entryType: 'text',
                            state: 'false',
                            notes: '',
                            photos: [],
                            memos: []
                        },
                        {
                            id: 7,
                            text: "Did victim live alone or with someone?",
                            entryType: 'text',
                            state: 'false',
                            notes: '',
                            photos: [],
                            memos: []
                        },
                        {
                            id: 8,
                            text: "Location of body",
                            entryType: 'text',
                            state: 'false',
                            notes: '',
                            photos: [],
                            memos: []
                        }
                    ]
                },
                {
                    id: 1,
                    text: 'Natural Causes',
                    type: 'header',
                    entryType: 'text',
                    state: 'false',
                    subQuestions:[
                        {
                            id: 1,
                            text: 'Scene examination',
                            type: 'header',
                            entryType: 'text',
                            state: 'false',
                            subQuestions:[
                                {
                                    id: 1,
                                    text: "Advise supervisor of complaint",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 2,
                                    text: "Secure scene",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 3,
                                    text: "Do not allow unauthorized personal to attend the scene and document all names and actions of persons entering and exiting the scene",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 4,
                                    text: "h. Witnesses Statements",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 5,
                                    text: "Document who entered the scene prior to your arrival and their activities",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 6,
                                    text: "Secure possible witnesses",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 7,
                                    text: "Examine area to determine if body location is consistent with possible cause of death",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 8,
                                    text: "Is the location of the body logical or true place of death?",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 9,
                                    text: " Are the injuries consistent with position of body?",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 10,
                                    text: "Is age a causal factor?",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 11,
                                    text: "Is there evidence of intrusion versus secure premises?",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 12,
                                    text: "Is there evidence of violence or disarray? (blood trail, splatter, human tissue or fluid, weapons, obvious injury, disturbed clothing)",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 13,
                                    text: "Examine body to ensure no evidence of foul play",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 14,
                                    text: "What is the ambient temperature, i.e. Compare body temperature to the environment. Is there insect or vermin activity?",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 15,
                                    text: "Photo's of scene and body",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                }
                            ]
                        },
                        {
                            id: 2,
                            text: 'Initial questions for investigation',
                            type: 'header',
                            entryType: 'text',
                            state: 'false',
                            subQuestions:[
                                {
                                    id: 1,
                                    text: "Who found body?",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 2,
                                    text: "Who last saw the victim alive?",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 3,
                                    text: "Next of Kin?",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 4,
                                    text: "Medical history of victim",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 5,
                                    text: "Is there evidence of medications or drugs? (special places to look are medicine cabinet, purses, refrigerator and waste baskets, secure for pathologist, send with body)",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 6,
                                    text: "Past Health issues (physical and/or mental)",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 7,
                                    text: "Family Doctor",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 8,
                                    text: "Last seen by doctor (who, where, when, why)",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 9,
                                    text: "Discuss Emergency Medical Services findings",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 10,
                                    text: "Time of death",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                }
                            ]
                        },
                        {
                            id: 3,
                            text: 'Contact Coroner',
                            type: 'header',
                            entryType: 'text',
                            state: 'false',
                            subQuestions:[
                                {
                                    id: 1,
                                    text: "Contact Coroner to advise of death",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 2,
                                    text: "Advise of findings",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 3,
                                    text: "Determine if Coroner is attending or not",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 4,
                                    text: "If attending, keep body secured",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 5,
                                    text: "If not attending contact Body Removal Services",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 6,
                                    text: "Determine if autopsy is to be conducted",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                }
                            ]
                        },
                        {
                            id: 4,
                            text: 'Prepare body for Transport',
                            type: 'header',
                            entryType: 'text',
                            state: 'false',
                            subQuestions:[
                                {
                                    id: 1,
                                    text: "Tag body",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 2,
                                    text: "Seize valuables on victim or turn over to family present",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 3,
                                    text: "Query deceased on CPIC, if has criminal record, fingerprint",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                }
                            ]
                        },
                        {
                            id: 5,
                            text: 'Statements',
                            type: 'header',
                            entryType: 'text',
                            state: 'false',
                            subQuestions:[
                                {
                                    id: 1,
                                    text: "From person who located body",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 2,
                                    text: "Person who last saw the victim alive",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 3,
                                    text: "Anyone that can further your investigation",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 4,
                                    text: "Family that can provide medical history,recent activities or behaviour of the victim",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 5,
                                    text: "Friends who know history or recent activities or behaviour of victim",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 6,
                                    text: "Any names that arise during investigation or statements that can further the investigation",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 7,
                                    text: "Determine time between death and discovery",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 8,
                                    text: "Did the deceased complain of anything prior to death",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 9,
                                    text: "Activities prior to death",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 10,
                                    text: "Any alcohol or drugs used at time of Death?",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                }
                            ]
                        },
                        {
                            id: 6,
                            text: 'Update supervisor',
                            entryType: 'text',
                            state: 'false',
                            subQuestions:[

                            ]
                        },
                        {
                            id: 7,
                            text: 'Obtain names of persons on scene',
                            type: 'header',
                            entryType: 'text',
                            state: 'false',
                            subQuestions:[
                                {
                                    id: 1,
                                    text: "EMS attendants",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 2,
                                    text: "Witnesses and family",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 3,
                                    text: "Firefighters",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 4,
                                    text: "Coroner",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 5,
                                    text: "Body Removal Team",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 6,
                                    text: "Other police officers",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                }
                            ]
                        },
                        {
                            id: 8,
                            text: 'Follow Up',
                            type: 'header',
                            entryType: 'text',
                            state: 'false',
                            subQuestions:[
                                {
                                    id: 1,
                                    text: "Follow up with family",
                                    type: 'header',
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: [],
                                    subQuestions:[
                                        {
                                            id: 1,
                                            text: "Answer any questions",
                                            entryType: 'text',
                                            state: 'false',
                                            notes: '',
                                            photos: [],
                                            memos: []
                                        },
                                        {
                                            id: 2,
                                            text: "Provide contact info for police and other services (e.g. Where body will be located)",
                                            entryType: 'text',
                                            state: 'false',
                                            notes: '',
                                            photos: [],
                                            memos: []
                                        },
                                        {
                                            id: 3,
                                            text: "Offer any applicable services (e.g. Victim services)",
                                            entryType: 'text',
                                            state: 'false',
                                            notes: '',
                                            photos: [],
                                            memos: []
                                        }
                                    ]
                                },
                                {
                                    id: 2,
                                    text: "Conduct NOK's if needed",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 3,
                                    text: "If autopsy to be conducted secure body and submit required documentation ",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 4,
                                    text: "Forward any required advanced messages",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 5,
                                    text: "If no autopsy to be conducted, write up file and conclude",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    text: 'Accidental',
                    type: 'header',
                    entryType: 'text',
                    state: 'false',
                    subQuestions:[
                        {
                            id: 1,
                            text: 'Prior to entry',
                            type: 'header',
                            entryType: 'text',
                            state: 'false',
                            subQuestions:[
                                {
                                    id: 1,
                                    text: "All scene's must be assessed for potentially biohazardous material, including the presence of a dangerous suspect",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 2,
                                    text: "Do not enter a scene that you suspect has been exposed to chemical, biological, radiological, nuclear (CBRN) agents.",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 3,
                                    text: "If cause of death was electrical, stay back and ensure local power company cuts power prior to approaching scene",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 4,
                                    text: "Protect yourself and the public from further danger or exposure",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 5,
                                    text: "Secure the scene and request assistance",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 6,
                                    text: "If there is no indication of CBRN contamination or electrical hazards, secure the scene for investigation",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 7,
                                    text: "Advise supervisor and coroner of findings.",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 8,
                                    text: "What may appear to be accidental or explainable death may be a homicide. The coroner/medical examiner is the only authority who may determine cause of death and may want to attend the scene. ",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 9,
                                    text: "If death took place at a worksite, contact Occupational Health and Safety",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                }
                            ]
                        },
                        {
                            id: 2,
                            text: 'Hypothermia',
                            type: 'header',
                            entryType: 'text',
                            state: 'false',
                            subQuestions:[
                                {
                                    id: 9,
                                    text: "Symptoms of hypothermia can resemble death, and death can only be confirmed after the body has been warmed to normal temperature and resuscitation efforts have failed",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                }
                            ]
                        },
                        {
                            id: 3,
                            text: 'Deaths involving children',
                            type: 'header',
                            entryType: 'text',
                            state: 'false',
                            subQuestions:[
                                {
                                    id: 1,
                                    text: "The death of a child caused by shaken baby syndrome is not readily detected during an external examination. The cause of such a death may be determined through pathological examination.",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 2,
                                    text: "Most Shaken baby cases result in retinal hemorrhages. Ensure an opthamologist is consulted.",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 3,
                                    text: "Other injuries consistent with shaken baby syndrome are grab sites (bruises around shoulders or chest) or fractures of skull, ribs, or legs. Neck injuries are rarely observed.",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 4,
                                    text: "Sudden Infant Death Syndrome (SIDS) is defined as natural death which sudden and unexpected but remains unexplained. ",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 5,
                                    text: "Possible  cause of death have been ruled out by an examination of the scene, a thorough investication, an autiopsy, and a medical review.",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                },
                                {
                                    id: 6,
                                    text: "Consider support services such as General Investigation Section (GIS), Major Crimes Unit (MCU), Forensic Identification Section (FIS)",
                                    entryType: 'text',
                                    state: 'false',
                                    notes: '',
                                    photos: [],
                                    memos: []
                                }
                            ]
                        }
                    ]
                }

            ]
        }
    ];

    return {
        getAll: function() { return data; }
    };
});
