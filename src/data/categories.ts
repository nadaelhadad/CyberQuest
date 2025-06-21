import { Category } from '../types';

export const categories: Category[] = [
  {
    id: "crypto",
    name: "Cryptography",
    description: "Master the art of secure communications and code breaking. Learn various encryption techniques and how to crack them.",
    icon: "Shield",
    color: "cyber-black",
    isLocked: false,
    challenges: [
      {
        id: "crypto-1",
        categoryId: "crypto",
        title: "Whisper One – Bronze",
        description: "Their first note says \"Pngf vf sha!\" — looks harmless, right? But scroll further, and you'll find something more encrypted… maybe the real strike hides beneath the joke.",
        difficulty: 1,
        points: 50,
        solution: "CTF{Strike_01_Cafe_18:00}",
        hints: [
          {
            id: "crypto-1-hint-1",
            text: "Try shifting each letter forward.",
            cost: 10,
            isRevealed: false
          },
          {
            id: "crypto-1-hint-2",
            text: "Caesar cipher with shift +3.",
            cost: 20,
            isRevealed: false
          }
        ],
        flag: "CTF{Strike_01_Cafe_18:00}",
        isCompleted: false,
        isLocked: false
      },
      {
        id: "crypto-2",
        categoryId: "crypto",
        title: "Layered Cry",
        description: "Next message is wrapped three times. Strip every layer to find strike two.",
        difficulty: 2,
        points: 100,
        solution: "CTF{Strike_02_Subway_21:15}",
        hints: [
          {
            id: "crypto-2-hint-1",
            text: "Hint: Ends in == or = ? That's not random…",
            cost: 15,
            isRevealed: false
          },
          {
            id: "crypto-2-hint-2",
            text: "Hint: Hex digits cloak the next layer.",
            cost: 25,
            isRevealed: false
          },
          {
            id: "crypto-2-hint-3",
            text: "Hint: Letters dancing 13 places away.",
            cost: 35,
            isRevealed: false
          }
        ],
        flag: "CTF{Strike_02_Subway_21:15}",
        isCompleted: false,
        isLocked: false
      },
      {
        id: "crypto-3",
        categoryId: "crypto",
        title: "Mirror Block – Gold",
        description: "A 160-byte file shows repeating blocks — classic ECB. Our mole stole the key \"RED_DAWN_SECRET0\". Break strike three.",
        difficulty: 3,
        points: 150,
        solution: "CTF{Strike_03_Market_23:45}",
        hints: [
          {
            id: "crypto-3-hint-1",
            text: "Upload the file to CyberChef and use 'Detect ECB' to verify block repetition.",
            cost: 15,
            isRevealed: false
          },
          {
            id: "crypto-3-hint-2",
            text: "Use 'AES Decrypt' operation with mode = ECB, key = RED_DAWN_SECRET0.",
            cost: 25,
            isRevealed: false
          },
          {
            id: "crypto-3-hint-3",
            text: "The flag will be clearly displayed in format CTF{Strike_03_Market_23:45}.",
            cost: 35,
            isRevealed: false
          }
        ],
        flag: "CTF{Strike_03_Market_23:45}",
        isCompleted: false,
        isLocked: true
      },
      {
        id: "crypto-4",
        categoryId: "crypto",
        title: "Echo Pad – Platinum",
        description: "They reused an XOR pad again. Every flag starts `CTF{`. Find the fallback location.",
        difficulty: 4,
        points: 200,
        solution: "CTF{Fallback_Vault_43.653N_79.383W}",
        hints: [
          {
            id: "crypto-4-hint-1",
            text: "Upload whisper4.enc to CyberChef and use the 'XOR Crib' operation.",
            cost: 25,
            isRevealed: false
          },
          {
            id: "crypto-4-hint-2",
            text: "Set the crib to 'CTF{' to reveal the repeating XOR key.",
            cost: 35,
            isRevealed: false
          },
          {
            id: "crypto-4-hint-3",
            text: "The decrypted message will reveal the fallback vault coordinates.",
            cost: 45,
            isRevealed: false
          }
        ],
        flag: "CTF{Fallback_Vault_43.653N_79.383W}",
        isCompleted: false,
        isLocked: false
      },
      {
        id: "crypto-5",
        categoryId: "crypto",
        title: "🕵️ JWT Token Analysis",
        description: "A JWT token was found in the mole's system. It looks valid, but it has no signature. Decode it and check the contents.",
        difficulty: 5,
        points: 250,
        solution: "CTF{jWt_no_sign}",
        hints: [
          {
            id: "crypto-5-hint-1",
            text: "Use CyberChef or jwt.io to decode the token.",
            cost: 20,
            isRevealed: false
          },
          {
            id: "crypto-5-hint-2",
            text: "Look at the header: does it say 'alg: none'?",
            cost: 30,
            isRevealed: false
          }
        ],
        flag: "CTF{jWt_no_sign}",
        isCompleted: false,
        isLocked: true
      }
    ]
  },
      {
    id: "reversing",
    name: "Reverse Engineering",
    description: "NeuroLock ransomware doesn't ask for money. It threatens to erase entire memory-backup clinics unless victims solve riddles. The cure is hidden in the code. Break through all 5 layers. Rebuild the master key. Save the minds.",
    icon: "Bug",
    color: "neon-red",
    isLocked: false,
    challenges: [
            {
        id: "reversing-1",
        categoryId: "reversing",
        title: "🔓 Plain Token",
        description: "NeuroLock ransomware doesn't ask for money. It threatens to erase entire memory-backup clinics unless victims solve riddles. The cure is hidden in the code. Break through all 5 layers. Rebuild the master key. Save the minds. An app.ini file from the first clinic contains a strange token. Could this be the first shard of the master key?",
        difficulty: 1,
        points: 50,
        solution: "CTF{KeyShard_Alpha_7842}",
        hints: [
                    {
            id: "reversing-1-hint-1",
            text: "Tokens cloak secrets in plain sight.",
            cost: 25,
            isRevealed: false
                    },
                    {
            id: "reversing-1-hint-2",
            text: "Base64 veils the shard within.",
            cost: 30,
            isRevealed: false
                  },
                  {
            id: "reversing-1-hint-3",
            text: "Hint: Decoded whispers reveal the key.",
            cost: 40,
            isRevealed: false
                }
                ],
        flag: "CTF{KeyShard_Alpha_7842}",
        isCompleted: false,
        isLocked: false
            },
            {
        id: "reversing-2",
        categoryId: "reversing",
        title: "🗜️ Weak Zip",
        description: "The logs are zipped with a 'strong' password. Crack the archive to reveal the second shard. Logs captured during unauthorized access by GhostAgent. He thought encrypting the payload was enough...",
        difficulty: 2,
        points: 100,
        solution: "CTF{KeyShard_Bravo_5C3F}",
        hints: [
                    {
            id: "reversing-2-hint-1",
            text: "Locks weaken with simple keys.",
            cost: 35,
            isRevealed: false
                    },
                    {
            id: "reversing-2-hint-2",
            text: "Guess the maker's own words.",
            cost: 50,
            isRevealed: false
                  },
                  {
            id: "reversing-2-hint-3",
            text: "Inside lies the guarded shard.",
            cost: 60,
            isRevealed: false
                }
                ],
        flag: "CTF{KeyShard_Bravo_5C3F}",
        isCompleted: false,
        isLocked: false
            },
            {
        id: "reversing-3",
        categoryId: "reversing",
        title: "💻 Hidden Shell",
        description: "A scrambled PowerShell script was intercepted. De-obfuscate it to extract shard three.",
        difficulty: 3,
        points: 150,
        solution: "CTF{KeyShard_Charlie_22D9}",
        hints: [
                    {
            id: "reversing-3-hint-1",
            text: "Scripts mask their true intent.",
            cost: 45,
            isRevealed: false
                    },
                    {
            id: "reversing-3-hint-2",
            text: "Base64 shields the shell's heart.",
            cost: 60,
            isRevealed: false
                  },
                  {
            id: "reversing-3-hint-3",
            text: "Unveiled commands spill the key.",
            cost: 75,
            isRevealed: false
                }
                ],
        flag: "CTF{KeyShard_Charlie_22D9}",
        isCompleted: false,
        isLocked: true
            },
            {
        id: "reversing-4",
        categoryId: "reversing",
        title: "🎵 Number Song",
        description: "The main.js file is filled with numbers and eval calls. Decode it and find the fourth shard.",
        difficulty: 4,
        points: 200,
        solution: "CTF{KeyShard_Delta_9A71}",
        hints: [
                    {
            id: "reversing-4-hint-1",
            text: "Numbers sing an ASCII tune.",
            cost: 60,
            isRevealed: false
                    },
                    {
            id: "reversing-4-hint-2",
            text: "Characters form from coded notes.",
            cost: 70,
            isRevealed: false
                  },
                  {
            id: "reversing-4-hint-3",
            text: "Shifted strings hide deeper truth.",
            cost: 90,
            isRevealed: false
                }
                ],
        flag: "CTF{KeyShard_Delta_9A71}",
        isCompleted: false,
        isLocked: true
            },
            {
        id: "reversing-5",
        categoryId: "reversing",
        title: "🧬 Pixel Cure",
        description: "The splash image is too large for its resolution. Hide and seek: the final key is inside.",
        difficulty: 5,
        points: 250,
        solution: "CTF{MasterKey_ABCD-7842-5C3F-22D9-9A71}",
        hints: [
                    {
            id: "reversing-5-hint-1",
            text: "Extract LSB (blue channel, 1-bit) using steganography tools.",
            cost: 150,
            isRevealed: false
                    }
                ],
        flag: "CTF{MasterKey_ABCD-7842-5C3F-22D9-9A71}",
        isCompleted: false,
        isLocked: true
            }
        ]
    },
    {
    id: "web",
    name: "Web Exploitation",
    description: "SkyLine Air looks like a regular airline—until you find its hidden portal GOLD GATE, where stolen passenger data is traded. You must break through 5 flawed layers of web defense before the first illegal flight takes off tomorrow.",
    icon: "Globe",
    color: "cyber-yellow",
    isLocked: false,
    challenges: [
          {
        id: "web-1",
        categoryId: "web",
        title: "💬 Comment Door",
        description: "SkyLine Air looks like a regular airline—until you find its hidden portal GOLD GATE, where stolen passenger data is traded. You must break through 5 flawed layers of web defense before the first illegal flight takes off tomorrow. The homepage might hide a secret path in the comments. View the page source carefully.",
        difficulty: 1,
        points: 50,
        solution: "CTF{Runway_Zero_Gate_A}",
        hints: [
                  {
            id: "web-1-hint-1",
            text: "Developers leave notes in the shadows.",
            cost: 35,
            isRevealed: false
                  },
                  {
            id: "web-1-hint-2",
            text: "Comments conceal a hidden path.",
            cost: 50,
            isRevealed: false
                }
              ],
        flag: "CTF{Runway_Zero_Gate_A}",
        isCompleted: false,
        isLocked: false
          },
          {
        id: "web-2",
        categoryId: "web",
        title: "🍪 Cookie Upgrade",
        description: "The /gold page uses a seatClass cookie. Can you upgrade it to gain admin privileges?",
        difficulty: 2,
        points: 100,
        solution: "CTF{Admin_Cabin_Seat_1A}",
        hints: [
                  {
            id: "web-2-hint-1",
            text: "Your pass lies in the cookie.",
            cost: 40,
            isRevealed: false
                  },
                  {
            id: "web-2-hint-2",
            text: "Rewrite your seat to rise higher.",
            cost: 55,
            isRevealed: false
                },
                {
            id: "web-2-hint-3",
            text: "New class unlocks secret doors'.",
            cost: 65,
            isRevealed: false
                  }
              ],
        flag: "CTF{Admin_Cabin_Seat_1A}",
        isCompleted: false,
        isLocked: true
          },
          {
        id: "web-3",
        categoryId: "web",
        title: "📁 Cargo Shortcut",
        description: "The /hold endpoint should stay inside /storage. Use directory traversal to get the secret.",
        difficulty: 3,
        points: 150,
        solution: "CTF{Cargo_Hold_Map_B4}",
        hints: [
                  {
            id: "web-3-hint-1",
            text: "Paths can slip past their bounds.",
            cost: 45,
            isRevealed: false
                  },
                  {
            id: "web-3-hint-2",
            text: "Climb the tree with ../ steps.",
            cost: 65,
            isRevealed: false
                },
                {
            id: "web-3-hint-3",
            text: "The manifest hides the prize.",
            cost: 70,
            isRevealed: false
              }
              ],
        flag: "CTF{Cargo_Hold_Map_B4}",
        isCompleted: false,
        isLocked: true
          },
          {
        id: "web-4",
        categoryId: "web",
        title: "🛫 Two Seats, One Choice",
        description: "The booking API reads only the first seat value. What if you send two?",
        difficulty: 4,
        points: 200,
        solution: "CTF{VIP_Manifest_Flight_777}",
        hints: [
                  {
            id: "web-4-hint-1",
            text: "Timing bends the system's rules.",
            cost: 50,
            isRevealed: false
                  },
                  {
            id: "web-4-hint-2",
            text: "Two voices can speak as one.",
            cost: 75,
            isRevealed: false
                },
                {
            id: "web-4-hint-3",
            text: "Confusion grants unexpected access.",
            cost: 90,
            isRevealed: false
              }
              ],
        flag: "CTF{VIP_Manifest_Flight_777}",
        isCompleted: false,
        isLocked: true
          },
          {
        id: "web-5",
        categoryId: "web",
        title: "🧊 Frozen Nonce",
        description: "The /scan page uses a CSP nonce that never changes. That's dangerous. Exploit it.",
        difficulty: 5,
        points: 250,
        solution: "CTF{CEO_Token_Landing-0100Z}",
        hints: [
                  {
            id: "web-5-hint-1",
            text: "Tokens should dance, not freeze.",
            cost: 70,
            isRevealed: false
                  },
                  {
            id: "web-5-hint-2",
            text: "Reuse the stillness to strike.",
            cost: 85,
            isRevealed: false
                },
                {
            id: "web-5-hint-3",
            text: "The scanner obeys your echo.",
            cost: 110,
            isRevealed: false
              }
              ],
        flag: "CTF{CEO_Token_Landing-0100Z}",
        isCompleted: false,
        isLocked: true
          }
      ]
  },
  {
    id: "forensics",
    name: "Digital Forensics",
    description: "Every night at 02:17, a pirate signal hijacks a TV channel for 61 seconds. The video? Empty streets. The audio? A voice played backward: 'Find me before dawn.' We recovered five clues. Uncover the hijacker's next move—and who they really are.",
    icon: "Search",
    color: "cyber-blue",
    isLocked: false,
    challenges: [
        {
        id: "forensics-1",
        categoryId: "forensics",
        title: "🔍 Forgotten Selfie",
        description: "Every night at 02:17, a pirate signal hijacks a TV channel for 61 seconds. The video? Empty streets. The audio? A voice played backward: 'Find me before dawn.' We recovered five clues. Uncover the hijacker's next move—and who they really are. A selfie from the latest crash says, 'Already left the city.' Prove the speaker never left town.",
        difficulty: 1,
        points: 50,
        solution: "CTF{Ash_Sheikh_Zayed_02:17:05}",
        hints: [
                {
            id: "forensics-1-hint-1",
            text: "Images carry silent stories beyond the pixels.",
            cost: 20,
            isRevealed: false
                },
                {
            id: "forensics-1-hint-2",
            text: "Tools like ExifTool can reveal hidden details.",
            cost: 35,
            isRevealed: false
              },
              {
            id: "forensics-1-hint-3",
            text: "Coordinates and timestamps might point the way.",
            cost: 50,
            isRevealed: false
            }
            ],
        flag: "CTF{Ash_Sheikh_Zayed_02:17:05}",
        isCompleted: false,
        isLocked: false
        },
        {
        id: "forensics-2",
        categoryId: "forensics",
        title: "🔊 False Track – Silver",
        description: "A zip called \"street_sounds.zip\" holds many audio files. One refuses to play. Unmask it.",
        difficulty: 2,
        points: 150,
        solution: "CTF{Dock-47_Control_Node}",
        hints: [
                {
            id: "forensics-2-hint-1",
            text: "Try using CyberChef's 'Unzip' operation to extract the contents of the zip file.",
            cost: 10,
            isRevealed: false
                },
                {
            id: "forensics-2-hint-2",
            text: "Look for files with unusual extensions or that don't play normally in audio players.",
            cost: 15,
            isRevealed: false
              },
              {
            id: "forensics-2-hint-3",
            text: "The flag is hidden in a file that appears to be corrupted or unplayable. Try examining its hex content.",
            cost: 25,
            isRevealed: false
            }
            ],
        flag: "CTF{Dock-47_Control_Node}",
        isCompleted: false,
        isLocked: false
        },
        {
        id: "forensics-3",
        categoryId: "forensics",
        title: "🔍 Three-Second Burst",
        description: "Engineers grabbed only three seconds of network traffic during the last hijack. Check if any secret left the studio.",
        difficulty: 3,
        points: 200,
        solution: "CTF{Uplink_SAT-ECHO_Live}",
        hints: [
                {
            id: "forensics-3-hint-1",
            text: "Upload the PCAP file to PacketTotal to analyze the network traffic.",
            cost: 10,
            isRevealed: false
                },
                {
            id: "forensics-3-hint-2",
            text: "Look for HTTP POST requests in the traffic capture - there should be only one.",
            cost: 15,
            isRevealed: false
              },
              {
            id: "forensics-3-hint-3",
            text: "The POST body contains base64 encoded data. Use CyberChef to decode it from Base64 to text.",
            cost: 25,
            isRevealed: false
            }
            ],
        flag: "CTF{Uplink_SAT-ECHO_Live}",
        isCompleted: false,
        isLocked: true
        },
        {
        id: "forensics-4",
        categoryId: "forensics",
        title: "🧾 Needle in the Log – Platinum",
        description: "Right before the hijack, the studio's web panel saw a strange URL. It might hide the next coordinates in an SQL trick.",
        difficulty: 4,
        points: 250,
        solution: "CTF{Rendezvous_30.044N_31.236E_03:00}",
        hints: [
                {
            id: "forensics-4-hint-1",
            text: "One request stands out among the rest.",
            cost: 60,
            isRevealed: false
                },
                {
            id: "forensics-4-hint-2",
            text: "Queries merge forbidden data—look closer.",
            cost: 75,
            isRevealed: false
              },
              {
            id: "forensics-4-hint-3",
            text: "Errors whisper secrets they shouldn't.",
            cost: 90,
            isRevealed: false
            }
            ],
        flag: "CTF{Rendezvous_30.044N_31.236E_03:00}",
        isCompleted: false,
        isLocked: false
        },
        {
        id: "forensics-5",
        categoryId: "forensics",
        title: "🧠 Memory at 02:16",
        description: "The system crashed. Can the RAM dump and logs prove the hijack—and ID the voice?",
        difficulty: 5,
        points: 250,
        solution: "CTF{Voice_ID_Maya_Rahim}",
        hints: [
                {
            id: "forensics-5-hint-1",
            text: "Time unlocks chaos when systems align.",
            cost: 75,
            isRevealed: false
                },
                {
            id: "forensics-5-hint-2",
            text: "Voices emerge at the storm's peak.",
            cost: 90,
            isRevealed: false
              },
              {
            id: "forensics-5-hint-3",
            text: "Transmission's start hides the key.",
            cost: 120,
            isRevealed: false
            }
            ],
        flag: "CTF{Voice_ID_Maya_Rahim}",
        isCompleted: false,
        isLocked: true
        }
    ]
}    
];
