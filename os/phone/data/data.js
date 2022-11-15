export const cardsData = [
	{
		name: "Ana",
		hero_image: "https://static.wikia.nocookie.net/overwatch_gamepedia/images/7/76/Ana.png",
		difficulty: 3,
		type: "support",
		description:
			"Ana's versatile arsenal allows her to affect heroes all over the battlefield. Her Biotic Rifle rounds and Biotic Grenades heal allies and damage or impair enemies; her sidearm tranquilizes key targets, and Nano Boost gives one of her comrades a considerable increase in power.",
		abilities: [
			{
				name: "Biotic Rifle",
				type: "weaponPrimary",
				ability_image:
					"https://d15f34w2p8l1cc.cloudfront.net/overwatch/efe0ebb135e87dc26b60f0d20500dcd7553ad121ab2b10cd4ffb5db17be9c977.png",
			},
			{
				name: "Sleep Dart",
				type: "ability",
				ability_image:
					"https://d15f34w2p8l1cc.cloudfront.net/overwatch/20707fd82265412fdc6d2353daa88ec7558cd71c89aa3ac6cf0e78bbbfcabd80.png",
			},
			{
				name: "Biotic Grenade",
				type: "ability",
				ability_image:
					"https://d15f34w2p8l1cc.cloudfront.net/overwatch/c8190b234bf0a0e28eecffe162d0c942e6b8656e95f4688c6ca3b025fa5a487d.png",
			},
			{
				name: "Nano Boost",
				type: "ultimate",
				ability_image:
					"https://d15f34w2p8l1cc.cloudfront.net/overwatch/6fda18b343f3fd0e8dc50fa5a91589e1ca9ed7471a354f61dfc9f22b27b19497.png",
			},
		],
	},
	{
		name: "Ashe",
		hero_image: "https://static.wikia.nocookie.net/overwatch_gamepedia/images/4/4f/Ashe-portrait.png",
		difficulty: 2,
		type: "damage",
		description:
			"Ashe quickly fires her rifle from the hip or uses her weapon's aim-down sights to line up a high damage shot at the cost of fire-rate. She blasts enemies by throwing dynamite, and her coach gun packs enough punch to put some distance between her and her foes, or gain some air to leap to hard to reach places or for an aerial shot. And Ashe is not alone, as she can call on her omnic ally B.O.B. to join the fray when the need arises.",
		abilities: [
			{
				name: "The Viper",
				type: "weaponPrimary",
				ability_image:
					"https://d15f34w2p8l1cc.cloudfront.net/overwatch/cca8472a3e966de2b9985cee492e527eac5063e9881797dded4ca1e32e292bc0.png",
			},
			{
				name: "Dynamite",
				type: "ability",
				ability_image:
					"https://d15f34w2p8l1cc.cloudfront.net/overwatch/a326b202a821ab3e196d1faab6144460f470001b26a8b6f2ab96cb3af5f325b3.png",
			},
			{
				name: "Coach Gun",
				type: "ability",
				ability_image:
					"https://d15f34w2p8l1cc.cloudfront.net/overwatch/e18f7b6e464f0cf34789babf7a76b7e1d851e62102dccfe10769bcf8716e5554.png",
			},
			{
				name: "B.O.B.",
				type: "ultimate",
				ability_image:
					"https://d15f34w2p8l1cc.cloudfront.net/overwatch/e788b12d476e896dac3831bbc0842fb3b4d07a89b3c337959d9a6cd6ea5a7df5.png",
			},
		],
	},
	{
		name: "Baptiste",
		hero_image: "https://static.wikia.nocookie.net/overwatch_gamepedia/images/0/01/Baptiste-portrait.png",
		difficulty: 1,
		type: "tank",
		difficulty: 3,
		description:
			"Baptiste wields an assortment of experimental devices and weaponry to keep allies alive and eliminate threats under fierce conditions. A battle-hardened combat medic, he is just as capable of saving lives as he is taking out the enemy.",
		abilities: [
			{
				name: "Biotic Launcher",
				type: "weaponPrimary",
				ability_image:
					"https://d15f34w2p8l1cc.cloudfront.net/overwatch/af62dfb3476b6389472188ce9e6e0e296928a5cb3ae87a4ed5133c8330e46f0d.png",
			},
			{
				name: "Biotic Launcher",
				type: "weaponSecondary",
				ability_image:
					"https://static.wikia.nocookie.net/overwatch_gamepedia/images/6/69/Baptiste-alt-fire.png",
			},
			{
				name: "Regenerative Burst",
				type: "ability",
				ability_image:
					"https://d15f34w2p8l1cc.cloudfront.net/overwatch/d887d165f7b0eb98a30af8f274ff740c6c7735af719b93e95dd9da17558815d8.png",
			},
			{
				name: "Immortality Field",
				type: "ability",
				ability_image:
					"https://d15f34w2p8l1cc.cloudfront.net/overwatch/d66d82bab88fc813080dd15e31629cc3aa7c8b41cfb41d5b962b628dd345e433.png",
			},
			{
				name: "Amplification Matrix",
				type: "ultimate",
				ability_image:
					"https://d15f34w2p8l1cc.cloudfront.net/overwatch/0a31371b55e4007e67a86f8495949970d20f64b2f0166e78d3fd16217e090a83.png",
			},
			{
				name: "Exo Boots",
				type: "passive",
				ability_image:
					"https://d15f34w2p8l1cc.cloudfront.net/overwatch/0d598afba5a03761d617d735d5435323c56108655b5017ddf8c36c4af36b9b73.png",
			},
		],
	},
	{
		name: "Bastion",
		hero_image: "https://static.wikia.nocookie.net/overwatch_gamepedia/images/d/d0/Bastion-portrait.png",
		difficulty: 1,
		type: "damage",
		description:
			"The ability to transform between Assault, Recon and devastating Artillery configurations provided Bastion with a high damage output.",
		abilities: [
			{
				name: "Configuration: Recon",
				type: "weaponPrimary",
				ability_image:
					"https://d15f34w2p8l1cc.cloudfront.net/overwatch/a2a15d0b50a53e0477ab65e55ed46248cf86ac976e5cef7c64078470dfa59807.png",
			},
			{
				name: "Configuration: Assault",
				type: "weaponTwo",
				ability_image:
					"https://d15f34w2p8l1cc.cloudfront.net/overwatch/5cf3fc40ec6eeee9716f66a934d9bf7f0803a924e72c12c5d1a6c74e57c933bd.png",
			},
			{
				name: "Reconfigure",
				type: "ability",
				ability_image:
					"https://d15f34w2p8l1cc.cloudfront.net/overwatch/56bef8912e83cac59dc0acb08bcaef591ff2ed52385424e8d753c03bbb77e4e9.png",
			},
			{
				name: "A-36 Tactical Grenade",
				type: "ability",
				ability_image:
					"https://d15f34w2p8l1cc.cloudfront.net/overwatch/22f9f8c043e1746011d7dcee2e811e0d24470bd0eb5128fca9c3aea2f2dcfe69.png",
			},
			{
				name: "Configuration: Artillery",
				type: "ultimate",
				ability_image:
					"https://d15f34w2p8l1cc.cloudfront.net/overwatch/06c377aef476bfb21ee1dca3d4d1151f8a4131b388a5489f3dfce6fb232a2711.png",
			},
			{
				name: "Ironclad",
				type: "passive",
				ability_image:
					"https://static.wikia.nocookie.net/overwatch_gamepedia/images/0/0f/Icon-ability.0f6m2.png",
			},
		],
	},
];
