{
	"version":"LAYASCENE3D:02",
	"data":{
		"type":"Scene3D",
		"props":{
			"name":"Main",
			"ambientColor":[
				0.212,
				0.227,
				0.259
			],
			"reflectionDecodingFormat":1,
			"reflection":"Assets/MainGIReflection.ltcb.ls",
			"reflectionIntensity":1,
			"ambientMode":1,
			"ambientSphericalHarmonics":[
				0.1678833,
				-0.01659219,
				-0.01137973,
				0.006569836,
				0.004985139,
				-0.00863496,
				0.009734808,
				-0.01030069,
				0.02333598,
				0.2107354,
				0.02701576,
				-0.0188861,
				0.01090351,
				0.008416954,
				-0.01457884,
				0.01416308,
				-0.01572332,
				0.03351187,
				0.2899403,
				0.109965,
				-0.0348096,
				0.0200939,
				0.01630429,
				-0.02824396,
				0.01814246,
				-0.02374582,
				0.04080005
			],
			"ambientSphericalHarmonicsIntensity":1,
			"lightmaps":[],
			"enableFog":false,
			"fogStart":0,
			"fogRange":300,
			"fogColor":[
				0.5,
				0.5,
				0.5
			]
		},
		"child":[
			{
				"type":"Camera",
				"instanceID":0,
				"props":{
					"name":"Main Camera",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						1.5,
						-5
					],
					"rotation":[
						0,
						0.9743701,
						0.2249511,
						0
					],
					"scale":[
						1,
						1,
						1
					],
					"clearFlag":0,
					"orthographic":false,
					"orthographicVerticalSize":10,
					"fieldOfView":60,
					"enableHDR":true,
					"nearPlane":0.3,
					"farPlane":1000,
					"viewport":[
						0,
						0,
						1,
						1
					],
					"clearColor":[
						0.5728907,
						0.7129323,
						0.7735849,
						0
					]
				},
				"components":[],
				"child":[]
			},
			{
				"type":"DirectionLight",
				"instanceID":1,
				"props":{
					"name":"Directional Light",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						3,
						0
					],
					"rotation":[
						0.1093816,
						0.8754261,
						0.4082179,
						-0.2345697
					],
					"scale":[
						1,
						1,
						1
					],
					"intensity":1,
					"lightmapBakedType":0,
					"color":[
						1,
						1,
						1
					]
				},
				"components":[],
				"child":[]
			},
			{
				"type":"Sprite3D",
				"instanceID":2,
				"props":{
					"name":"Parent",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						0,
						0
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						1,
						1,
						1
					]
				},
				"components":[],
				"child":[
					{
						"type":"MeshSprite3D",
						"instanceID":3,
						"props":{
							"name":"Column",
							"active":true,
							"isStatic":false,
							"layer":0,
							"position":[
								0,
								0,
								0
							],
							"rotation":[
								0,
								0,
								0,
								-1
							],
							"scale":[
								1,
								24,
								1
							],
							"meshPath":"Library/unity default resources-Cylinder.lm",
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Materials/Column.lmat"
								}
							]
						},
						"components":[
							{
								"type":"PhysicsCollider",
								"restitution":0,
								"friction":0.5,
								"rollingFriction":0,
								"shapes":[
									{
										"type":"CapsuleColliderShape",
										"center":[
											5.960464E-08,
											0,
											-8.940697E-08
										],
										"radius":0.5000001,
										"height":2,
										"orientation":1
									}
								],
								"isTrigger":false
							}
						],
						"child":[]
					},
					{
						"type":"Sprite3D",
						"instanceID":4,
						"props":{
							"name":"Platform",
							"active":true,
							"isStatic":false,
							"layer":0,
							"position":[
								0,
								0,
								0
							],
							"rotation":[
								-0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								2.5,
								2.5,
								1.2
							]
						},
						"components":[],
						"child":[
							{
								"type":"MeshSprite3D",
								"instanceID":5,
								"props":{
									"name":"Bar",
									"active":true,
									"isStatic":false,
									"layer":0,
									"position":[
										0,
										0,
										0
									],
									"rotation":[
										0,
										0,
										0.7071068,
										-0.7071068
									],
									"scale":[
										1,
										1,
										1
									],
									"meshPath":"Assets/Materials/45-node_id3.lm",
									"enableRender":true,
									"receiveShadows":true,
									"castShadow":true,
									"materials":[
										{
											"path":"Assets/Materials/BarMat.lmat"
										}
									]
								},
								"components":[
									{
										"type":"PhysicsCollider",
										"restitution":0,
										"friction":0.5,
										"rollingFriction":0,
										"shapes":[
											{
												"type":"MeshColliderShape",
												"mesh":"Assets/Materials/45-node_id3.lm"
											}
										],
										"isTrigger":false
									}
								],
								"child":[]
							},
							{
								"type":"MeshSprite3D",
								"instanceID":6,
								"props":{
									"name":"Bar",
									"active":true,
									"isStatic":false,
									"layer":0,
									"position":[
										0,
										0,
										0
									],
									"rotation":[
										0,
										0,
										0.3826835,
										-0.9238796
									],
									"scale":[
										1,
										1,
										1
									],
									"meshPath":"Assets/Materials/45-node_id3.lm",
									"enableRender":true,
									"receiveShadows":true,
									"castShadow":true,
									"materials":[
										{
											"path":"Assets/Materials/BarMat.lmat"
										}
									]
								},
								"components":[
									{
										"type":"PhysicsCollider",
										"restitution":0,
										"friction":0.5,
										"rollingFriction":0,
										"shapes":[
											{
												"type":"MeshColliderShape",
												"mesh":"Assets/Materials/45-node_id3.lm"
											}
										],
										"isTrigger":false
									}
								],
								"child":[]
							},
							{
								"type":"MeshSprite3D",
								"instanceID":7,
								"props":{
									"name":"Bar",
									"active":true,
									"isStatic":false,
									"layer":0,
									"position":[
										0,
										0,
										0
									],
									"rotation":[
										0,
										0,
										0,
										-1
									],
									"scale":[
										1,
										1,
										1
									],
									"meshPath":"Assets/Materials/45-node_id3.lm",
									"enableRender":true,
									"receiveShadows":true,
									"castShadow":true,
									"materials":[
										{
											"path":"Assets/Materials/BarMat.lmat"
										}
									]
								},
								"components":[
									{
										"type":"PhysicsCollider",
										"restitution":0,
										"friction":0.5,
										"rollingFriction":0,
										"shapes":[
											{
												"type":"MeshColliderShape",
												"mesh":"Assets/Materials/45-node_id3.lm"
											}
										],
										"isTrigger":false
									}
								],
								"child":[]
							},
							{
								"type":"MeshSprite3D",
								"instanceID":8,
								"props":{
									"name":"Bar",
									"active":true,
									"isStatic":false,
									"layer":0,
									"position":[
										0,
										0,
										0
									],
									"rotation":[
										0,
										0,
										-0.3826835,
										-0.9238795
									],
									"scale":[
										1,
										1,
										1
									],
									"meshPath":"Assets/Materials/45-node_id3.lm",
									"enableRender":true,
									"receiveShadows":true,
									"castShadow":true,
									"materials":[
										{
											"path":"Assets/Materials/BarMat.lmat"
										}
									]
								},
								"components":[
									{
										"type":"PhysicsCollider",
										"restitution":0,
										"friction":0.5,
										"rollingFriction":0,
										"shapes":[
											{
												"type":"MeshColliderShape",
												"mesh":"Assets/Materials/45-node_id3.lm"
											}
										],
										"isTrigger":false
									}
								],
								"child":[]
							},
							{
								"type":"MeshSprite3D",
								"instanceID":9,
								"props":{
									"name":"Bar",
									"active":true,
									"isStatic":false,
									"layer":0,
									"position":[
										0,
										0,
										0
									],
									"rotation":[
										0,
										0,
										-0.7071068,
										-0.7071068
									],
									"scale":[
										1,
										1,
										1
									],
									"meshPath":"Assets/Materials/45-node_id3.lm",
									"enableRender":true,
									"receiveShadows":true,
									"castShadow":true,
									"materials":[
										{
											"path":"Assets/Materials/BarMat.lmat"
										}
									]
								},
								"components":[
									{
										"type":"PhysicsCollider",
										"restitution":0,
										"friction":0.5,
										"rollingFriction":0,
										"shapes":[
											{
												"type":"MeshColliderShape",
												"mesh":"Assets/Materials/45-node_id3.lm"
											}
										],
										"isTrigger":false
									}
								],
								"child":[]
							},
							{
								"type":"MeshSprite3D",
								"instanceID":10,
								"props":{
									"name":"Bar",
									"active":true,
									"isStatic":false,
									"layer":0,
									"position":[
										0,
										0,
										0
									],
									"rotation":[
										0,
										0,
										-0.9238795,
										-0.3826836
									],
									"scale":[
										1,
										1,
										1
									],
									"meshPath":"Assets/Materials/45-node_id3.lm",
									"enableRender":true,
									"receiveShadows":true,
									"castShadow":true,
									"materials":[
										{
											"path":"Assets/Materials/BarMat.lmat"
										}
									]
								},
								"components":[
									{
										"type":"PhysicsCollider",
										"restitution":0,
										"friction":0.5,
										"rollingFriction":0,
										"shapes":[
											{
												"type":"MeshColliderShape",
												"mesh":"Assets/Materials/45-node_id3.lm"
											}
										],
										"isTrigger":false
									}
								],
								"child":[]
							},
							{
								"type":"MeshSprite3D",
								"instanceID":11,
								"props":{
									"name":"Bar",
									"active":true,
									"isStatic":false,
									"layer":0,
									"position":[
										0,
										0,
										0
									],
									"rotation":[
										0,
										0,
										-1,
										0
									],
									"scale":[
										1,
										1,
										1
									],
									"meshPath":"Assets/Materials/45-node_id3.lm",
									"enableRender":true,
									"receiveShadows":true,
									"castShadow":true,
									"materials":[
										{
											"path":"Assets/Materials/BarMat.lmat"
										}
									]
								},
								"components":[
									{
										"type":"PhysicsCollider",
										"restitution":0,
										"friction":0.5,
										"rollingFriction":0,
										"shapes":[
											{
												"type":"MeshColliderShape",
												"mesh":"Assets/Materials/45-node_id3.lm"
											}
										],
										"isTrigger":false
									}
								],
								"child":[]
							},
							{
								"type":"MeshSprite3D",
								"instanceID":12,
								"props":{
									"name":"Bar",
									"active":true,
									"isStatic":false,
									"layer":0,
									"position":[
										0,
										0,
										0
									],
									"rotation":[
										0,
										0,
										-0.9238796,
										0.3826833
									],
									"scale":[
										1,
										1,
										1
									],
									"meshPath":"Assets/Materials/45-node_id3.lm",
									"enableRender":true,
									"receiveShadows":true,
									"castShadow":true,
									"materials":[
										{
											"path":"Assets/Materials/BarMat.lmat"
										}
									]
								},
								"components":[
									{
										"type":"PhysicsCollider",
										"restitution":0,
										"friction":0.5,
										"rollingFriction":0,
										"shapes":[
											{
												"type":"MeshColliderShape",
												"mesh":"Assets/Materials/45-node_id3.lm"
											}
										],
										"isTrigger":false
									}
								],
								"child":[]
							}
						]
					}
				]
			},
			{
				"type":"MeshSprite3D",
				"instanceID":13,
				"props":{
					"name":"Player",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						1.7,
						-0.75
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						0.3,
						0.3,
						0.3
					],
					"meshPath":"Library/unity default resources-Sphere.lm",
					"enableRender":true,
					"receiveShadows":true,
					"castShadow":true,
					"materials":[
						{
							"path":"Assets/Materials/ColorL3.lmat"
						}
					]
				},
				"components":[],
				"child":[]
			},
			{
				"type":"TrailSprite3D",
				"instanceID":14,
				"props":{
					"name":"TrailRender",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						1.5,
						-0.75
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						0.3,
						0.3,
						0.3
					],
					"time":0.3,
					"minVertexDistance":0.1,
					"widthMultiplier":1,
					"textureMode":0,
					"widthCurve":[
						{
							"time":0,
							"inTangent":0,
							"outTangent":0,
							"value":0.2573204
						},
						{
							"time":0.9371744,
							"inTangent":0,
							"outTangent":0,
							"value":0.09357082
						},
						{
							"time":1,
							"inTangent":0,
							"outTangent":0,
							"value":0.09357082
						}
					],
					"colorGradient":{
						"mode":0,
						"colorKeys":[
							{
								"time":0,
								"value":[
									0,
									0.2927294,
									1
								]
							},
							{
								"time":1,
								"value":[
									0.2436365,
									0.5116192,
									0.6886792
								]
							}
						],
						"alphaKeys":[
							{
								"time":0,
								"value":1
							},
							{
								"time":1,
								"value":1
							}
						]
					},
					"alignment":0,
					"materials":[
						{
							"type":"Laya.TrailMaterial",
							"path":"Assets/Materials/Tail.lmat"
						}
					]
				},
				"components":[],
				"child":[]
			},
			{
				"type":"ShuriKenParticle3D",
				"instanceID":15,
				"props":{
					"name":"Particle",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						0,
						-1.46
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						0.3,
						0.3,
						0.3
					],
					"main":{
						"randomSeed":0,
						"bases":{
							"isPerformanceMode":true,
							"duration":0.6,
							"looping":false,
							"startLifetimeType":2,
							"startLifetimeConstant":0.6,
							"startLifetimeConstantMin":0.5,
							"startLifetimeConstantMax":0.6,
							"startSpeedConstant":20,
							"startSpeedConstantMax":20,
							"startSizeType":2,
							"startSizeConstant":0.5,
							"startSizeConstantMin":0.3,
							"startSizeConstantMax":0.5,
							"startRotationType":2,
							"startRotationConstant":6.283185,
							"startRotationConstantMax":6.283185,
							"randomizeRotationDirection":0.5,
							"startColorType":2,
							"gravityModifier":2,
							"scaleMode":0,
							"maxParticles":70,
							"autoRandomSeed":false
						},
						"vector3s":{
							"startSizeConstantSeparate":[
								0.5,
								1,
								1
							],
							"startSizeConstantMinSeparate":[
								0.3,
								0,
								0
							],
							"startSizeConstantMaxSeparate":[
								0.5,
								1,
								1
							],
							"startRotationConstantSeparate":[
								0,
								0,
								-6.283185
							],
							"startRotationConstantMaxSeparate":[
								0,
								0,
								-6.283185
							]
						},
						"vector4s":{
							"startColorConstant":[
								0.3725491,
								0.7029217,
								1,
								0.7843137
							],
							"startColorConstantMin":[
								0.1283479,
								0,
								1,
								0.5490196
							],
							"startColorConstantMax":[
								0.3725491,
								0.7029217,
								1,
								0.7843137
							]
						}
					},
					"emission":{
						"bases":{
							"enable":true,
							"emissionRate":0
						},
						"bursts":[
							{
								"time":0,
								"min":0,
								"max":70
							}
						]
					},
					"shape":{
						"shapeType":0,
						"bases":{
							"enable":true,
							"radius":0.01,
							"angle":0.7853982
						}
					},
					"colorOverLifetime":{
						"bases":{
							"enable":true
						},
						"color":{
							"type":1,
							"constant":[
								-3.172008E+26,
								4.591495E-41,
								-3.178111E+26,
								4.591495E-41
							],
							"gradient":{
								"alphas":[
									{
										"key":0,
										"value":1
									},
									{
										"key":0.5000076,
										"value":1
									},
									{
										"key":0.9799954,
										"value":0
									},
									{
										"key":1,
										"value":0
									}
								]
							},
							"constantMin":[
								-3.171955E+26,
								1.401298E-45,
								0.9833097,
								1.401298E-45
							],
							"constantMax":[
								-3.172008E+26,
								4.591495E-41,
								-3.178111E+26,
								4.591495E-41
							],
							"gradientMax":{
								"alphas":[
									{
										"key":0,
										"value":1
									},
									{
										"key":0.5000076,
										"value":1
									},
									{
										"key":0.9799954,
										"value":0
									},
									{
										"key":1,
										"value":0
									}
								]
							}
						}
					},
					"sizeOverLifetime":{
						"bases":{
							"enable":true
						},
						"size":{
							"type":0,
							"gradient":{
								"sizes":[
									{
										"key":0,
										"value":1
									},
									{
										"key":1,
										"value":0
									}
								]
							},
							"gradientX":{
								"sizes":[
									{
										"key":0,
										"value":1
									},
									{
										"key":1,
										"value":0
									}
								]
							},
							"gradientY":{
								"sizes":[
									{
										"key":0,
										"value":1
									},
									{
										"key":1,
										"value":1
									}
								]
							},
							"gradientZ":{
								"sizes":[
									{
										"key":0,
										"value":1
									},
									{
										"key":1,
										"value":1
									}
								]
							},
							"gradientMax":{
								"sizes":[
									{
										"key":0,
										"value":1
									},
									{
										"key":1,
										"value":0
									}
								]
							},
							"gradientXMax":{
								"sizes":[
									{
										"key":0,
										"value":1
									},
									{
										"key":1,
										"value":0
									}
								]
							},
							"gradientYMax":{
								"sizes":[
									{
										"key":0,
										"value":1
									},
									{
										"key":1,
										"value":1
									}
								]
							},
							"gradientZMax":{
								"sizes":[
									{
										"key":0,
										"value":1
									},
									{
										"key":1,
										"value":1
									}
								]
							}
						}
					},
					"renderer":{
						"resources":{
							"material":"Assets/Particle.lmat"
						}
					}
				},
				"components":[],
				"child":[]
			}
		]
	}
}