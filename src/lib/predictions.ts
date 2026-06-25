export const ADMIN_PREDICTIONS: Record<
	number,
	{ hs: number; as: number } | null
> = {
	// Group A
	1: null, // MEX vs RSA
	2: null, // MEX vs KOR
	3: null, // MEX vs CZE
	4: null, // RSA vs CZE
	5: null, // RSA vs KOR
	6: null, // KOR vs CZE
	// Group B
	7: null, // CAN vs BIH
	8: null, // CAN vs QAT
	9: null, // CAN vs SUI
	10: null, // BIH vs SUI
	11: null, // BIH vs QAT
	12: null, // QAT vs SUI
	// Group C
	13: null, // BRA vs MAR
	14: null, // BRA vs HAI
	15: null, // BRA vs SCO
	16: null, // MAR vs SCO
	17: null, // MAR vs HAI
	18: null, // HAI vs SCO
	// Group D
	19: null, // USA vs PAR
	20: null, // USA vs AUS
	21: null, // USA vs TUR
	22: null, // PAR vs TUR
	23: null, // PAR vs AUS
	24: null, // AUS vs TUR
	// Group E
	25: null, // GER vs CUW
	26: null, // GER vs CIV
	27: null, // GER vs ECU
	28: null, // CUW vs ECU
	29: null, // CUW vs CIV
	30: null, // CIV vs ECU
	// Group F
	31: null, // NED vs JPN
	32: null, // NED vs SWE
	33: null, // NED vs TUN
	34: null, // JPN vs TUN
	35: null, // JPN vs SWE
	36: null, // SWE vs TUN
	// Group G
	37: null, // BEL vs EGY
	38: null, // BEL vs IRN
	39: null, // BEL vs NZL
	40: null, // EGY vs NZL
	41: null, // EGY vs IRN
	42: null, // IRN vs NZL
	// Group H
	43: null, // ESP vs CPV
	44: null, // ESP vs KSA
	45: null, // ESP vs URY
	46: null, // CPV vs URY
	47: null, // CPV vs KSA
	48: null, // KSA vs URY
	// Group I
	49: null, // FRA vs SEN
	50: null, // FRA vs IRQ
	51: null, // FRA vs NOR
	52: null, // SEN vs NOR
	53: null, // SEN vs IRQ
	54: null, // IRQ vs NOR
	// Group J
	55: null, // ARG vs ALG
	56: null, // ARG vs AUT
	57: null, // ARG vs JOR
	58: null, // ALG vs JOR
	59: null, // ALG vs AUT
	60: null, // AUT vs JOR
	// Group K
	61: null, // POR vs COD
	62: null, // POR vs UZB
	63: null, // POR vs COL
	64: null, // COD vs COL
	65: null, // COD vs UZB
	66: null, // UZB vs COL
	// Group L
	67: null, // ENG vs CRO
	68: null, // ENG vs GHA
	69: null, // ENG vs PAN
	70: null, // CRO vs PAN
	71: null, // CRO vs GHA
	72: null, // GHA vs PAN
}

export const GUILLERMO_PREDICTIONS: Record<
	number,
	{ hs: number; as: number } | null
> = {
	// Group A
	1: { hs: 2, as: 1 }, // MEX vs RSA
	6: { hs: 2, as: 0 }, // KOR vs CZE
	4: { as: 0, hs: 1 }, // CZE vs RSA
	2: { hs: 1, as: 1 }, // MEX vs KOR
	5: { hs: 1, as: 1 }, // RSA vs KOR
	3: { as: 1, hs: 2 }, // CZE vs MEX
	// Group B
	7: { hs: 1, as: 2 }, // CAN vs BIH
	12: { hs: 0, as: 2 }, // QAT vs SUI
	10: { as: 1, hs: 1 }, // SUI vs BIH
	8: { hs: 0, as: 0 }, // CAN vs QAT
	11: { hs: 1, as: 0 }, // BIH vs QAT
	9: { as: 2, hs: 1 }, // SUI vs CAN
	// Group C`
	13: { hs: 2, as: 2 }, // BRA vs MAR
	18: { hs: 1, as: 2 }, // HAI vs SCO
	16: { as: 0, hs: 2 }, // SCO vs MAR
	14: { hs: 3, as: 0 }, // BRA vs HAI
	15: { as: 1, hs: 2 }, // SCO vs BRA
	17: { hs: 3, as: 0 }, // MAR vs HAI
	// Group D
	19: { hs: 1, as: 1 }, // USA vs PAR
	24: { hs: 0, as: 1 }, // AUS vs TUR
	20: { hs: 2, as: 1 }, // USA vs AUS
	22: { as: 1, hs: 2 }, // TUR vs PAR
	23: { hs: 2, as: 0 }, // PAR vs AUS
	21: { as: 1, hs: 2 }, // TUR vs USA
	// Group E
	25: { hs: 3, as: 0 }, // GER vs CUW
	30: { hs: 1, as: 1 }, // CIV vs ECU
	26: { hs: 2, as: 1 }, // GER vs CIV
	28: { as: 3, hs: 0 }, // ECU vs CUW
	29: { hs: 0, as: 2 }, // CUW vs CIV
	27: { as: 1, hs: 2 }, // ECU vs GER
	// Group F
	31: { hs: 2, as: 1 }, // NED vs JPN
	36: { hs: 1, as: 1 }, // SWE vs TUN
	32: { hs: 1, as: 1 }, // NED vs SWE
	34: { as: 1, hs: 2 }, // TUN vs JPN
	35: { hs: 2, as: 1 }, // JPN vs SWE
	33: { as: 0, hs: 2 }, // TUN vs NED
	// Group G
	37: { hs: 1, as: 1 }, // BEL vs EGY
	42: { hs: 2, as: 1 }, // IRN vs NZL
	38: { hs: 1, as: 1 }, // BEL vs IRN
	40: { as: 1, hs: 1 }, // NZL vs EGY
	39: { as: 0, hs: 2 }, // NZL vs BEL
	41: { hs: 1, as: 1 }, // EGY vs IRN
	// Group H
	43: { hs: 3, as: 0 }, // ESP vs CPV
	48: { hs: 1, as: 2 }, // KSA vs URY
	44: { hs: 2, as: 0 }, // ESP vs KSA
	46: { as: 2, hs: 0 }, // URY vs CPV
	47: { hs: 0, as: 1 }, // CPV vs KSA
	45: { as: 1, hs: 2 }, // URY vs ESP
	// Group I
	49: { hs: 2, as: 0 }, // FRA vs SEN
	54: { hs: 0, as: 1 }, // IRQ vs NOR
	50: { hs: 2, as: 0 }, // FRA vs IRQ
	52: { as: 1, hs: 1 }, // NOR VS SEN
	53: { hs: 2, as: 1 }, // SEN vs IRQ
	51: { as: 0, hs: 2 }, // NOR VS FRA
	// Group J
	55: { hs: 2, as: 0 }, // ARG vs ALG
	60: { hs: 0, as: 1 }, // AUT vs JOR
	56: { hs: 2, as: 1 }, // ARG vs AUT
	58: { as: 0, hs: 1 }, // JOR VS ALG
	59: { hs: 1, as: 1 }, // ALG vs AUT
	57: { as: 0, hs: 3 }, // JOR VS ARG
	// Group K
	61: { hs: 2, as: 0 }, // POR vs COD
	66: { hs: 0, as: 1 }, // UZB vs COL
	62: { hs: 1, as: 0 }, // POR vs UZB
	64: { as: 2, hs: 0 }, // COL vs COD
	65: { hs: 0, as: 1 }, // COD vs UZB
	63: { as: 1, hs: 1 }, // COL vs POR
	// Group L
	67: { hs: 2, as: 1 }, // ENG vs CRO
	72: { hs: 2, as: 0 }, // GHA vs PAN
	68: { hs: 2, as: 1 }, // ENG vs GHA
	70: { as: 1, hs: 2 }, // PAN vs CRO
	71: { hs: 1, as: 1 }, // CRO vs GHA
	69: { as: 0, hs: 2 }, // PAN vs ENG
}

export const GUSTAVO_PREDICTIONS: Record<
	number,
	{ hs: number; as: number } | null
> = {
	// Group A
	1: { hs: 2, as: 1 }, // MEX vs RSA
	6: { hs: 1, as: 1 }, // KOR vs CZE
	4: { as: 1, hs: 0 }, // CZE vs RSA
	2: { hs: 1, as: 1 }, // MEX vs KOR
	5: { hs: 2, as: 2 }, // RSA vs KOR
	3: { as: 1, hs: 1 }, // CZE vs MEX
	// Group B
	7: { hs: 1, as: 2 }, // CAN vs BIH
	12: { hs: 0, as: 0 }, // QAT vs SUI
	10: { as: 1, hs: 1 }, // SUI vs BIH
	8: { hs: 1, as: 1 }, // CAN vs QAT
	11: { hs: 2, as: 0 }, // BIH vs QAT
	9: { as: 1, hs: 0 }, // SUI vs CAN
	// Group C`
	13: { hs: 2, as: 0 }, // BRA vs MAR
	18: { hs: 0, as: 2 }, // HAI vs SCO
	16: { as: 1, hs: 2 }, // SCO vs MAR
	14: { hs: 4, as: 0 }, // BRA vs HAI
	15: { as: 1, hs: 3 }, // SCO vs BRA
	17: { hs: 2, as: 0 }, // MAR vs HAI
	// Group D
	19: { hs: 1, as: 1 }, // USA vs PAR
	24: { hs: 0, as: 1 }, // AUS vs TUR
	20: { hs: 1, as: 1 }, // USA vs AUS
	22: { as: 1, hs: 3 }, // TUR vs PAR
	23: { hs: 1, as: 0 }, // PAR vs AUS
	21: { as: 1, hs: 2 }, // TUR vs USA
	// Group E
	25: { hs: 5, as: 0 }, // GER vs CUW
	30: { hs: 1, as: 2 }, // CIV vs ECU
	26: { hs: 3, as: 1 }, // GER vs CIV
	28: { as: 3, hs: 0 }, // ECU vs CUW
	29: { hs: 0, as: 2 }, // CUW vs CIV
	27: { as: 1, hs: 1 }, // ECU vs GER
	// Group F
	31: { hs: 2, as: 1 }, // NED vs JPN
	36: { hs: 0, as: 0 }, // SWE vs TUN
	32: { hs: 2, as: 2 }, // NED vs SWE
	34: { as: 1, hs: 2 }, // TUN vs JPN
	35: { hs: 1, as: 1 }, // JPN vs SWE
	33: { as: 1, hs: 3 }, // TUN vs NED
	// Group G
	37: { hs: 2, as: 0 }, // BEL vs EGY
	42: { hs: 0, as: 0 }, // IRN vs NZL
	38: { hs: 3, as: 1 }, // BEL vs IRN
	40: { as: 0, hs: 2 }, // NZL vs EGY
	39: { as: 0, hs: 3 }, // NZL vs BEL
	41: { hs: 1, as: 0 }, // EGY vs IRN
	// Group H
	43: { hs: 4, as: 0 }, // ESP vs CPV
	48: { hs: 1, as: 2 }, // KSA vs URY
	44: { hs: 3, as: 1 }, // ESP vs KSA
	46: { as: 2, hs: 0 }, // URY vs CPV
	47: { hs: 0, as: 2 }, // CPV vs KSA
	45: { as: 1, hs: 1 }, // URY vs ESP
	// Group I
	49: { hs: 3, as: 0 }, // FRA vs SEN
	54: { hs: 0, as: 2 }, // IRQ vs NOR
	50: { hs: 2, as: 0 }, // FRA vs IRQ
	52: { as: 1, hs: 1 }, // NOR VS SEN
	53: { hs: 2, as: 0 }, // SEN vs IRQ
	51: { as: 1, hs: 2 }, // NOR VS FRA
	// Group J
	55: { hs: 2, as: 1 }, // ARG vs ALG
	60: { hs: 2, as: 0 }, // AUT vs JOR
	56: { hs: 1, as: 0 }, // ARG vs AUT
	58: { as: 0, hs: 2 }, // JOR VS ALG
	59: { hs: 2, as: 1 }, // ALG vs AUT
	57: { as: 0, hs: 3 }, // JOR VS ARG
	// Group K
	61: { hs: 4, as: 0 }, // POR vs COD
	66: { hs: 1, as: 2 }, // UZB vs COL
	62: { hs: 2, as: 0 }, // POR vs UZB
	64: { as: 3, hs: 0 }, // COL vs COD
	65: { hs: 1, as: 1 }, // COD vs UZB
	63: { as: 2, hs: 2 }, // COL vs POR
	// Group L
	67: { hs: 1, as: 0 }, // ENG vs CRO
	72: { hs: 2, as: 0 }, // GHA vs PAN
	68: { hs: 2, as: 0 }, // ENG vs GHA
	70: { as: 0, hs: 3 }, // PAN vs CRO
	71: { hs: 1, as: 1 }, // CRO vs GHA
	69: { as: 0, hs: 3 }, // PAN vs ENG
}

export const JONATAN_PREDICTIONS: Record<
	number,
	{ hs: number; as: number } | null
> = {
	// Group A
	1: { hs: 2, as: 1 }, // MEX vs RSA
	6: { hs: 1, as: 1 }, // KOR vs CZE
	4: { as: 1, hs: 0 }, // CZE vs RSA
	2: { hs: 1, as: 0 }, // MEX vs KOR
	5: { hs: 1, as: 2 }, // RSA vs KOR
	3: { as: 1, hs: 2 }, // CZE vs MEX
	// Group B
	7: { hs: 1, as: 0 }, // CAN vs BIH
	12: { hs: 0, as: 1 }, // QAT vs SUI
	10: { as: 1, hs: 1 }, // SUI vs BIH
	8: { hs: 0, as: 0 }, // CAN vs QAT
	11: { hs: 1, as: 0 }, // BIH vs QAT
	9: { as: 1, hs: 1 }, // SUI vs CAN
	// Group C`
	13: { hs: 2, as: 0 }, // BRA vs MAR
	18: { hs: 0, as: 2 }, // HAI vs SCO
	16: { as: 1, hs: 1 }, // SCO vs MAR
	14: { hs: 3, as: 1 }, // BRA vs HAI
	15: { as: 0, hs: 3 }, // SCO vs BRA
	17: { hs: 1, as: 1 }, // MAR vs HAI
	// Group D
	19: { hs: 2, as: 1 }, // USA vs PAR
	24: { hs: 1, as: 1 }, // AUS vs TUR
	20: { hs: 1, as: 0 }, // USA vs AUS
	22: { as: 0, hs: 1 }, // TUR vs PAR
	23: { hs: 2, as: 2 }, // PAR vs AUS
	21: { as: 1, hs: 2 }, // TUR vs USA
	// Group E
	25: { hs: 3, as: 0 }, // GER vs CUW
	30: { hs: 2, as: 1 }, // CIV vs ECU
	26: { hs: 2, as: 0 }, // GER vs CIV
	28: { as: 1, hs: 0 }, // ECU vs CUW
	29: { hs: 0, as: 2 }, // CUW vs CIV
	27: { as: 1, hs: 2 }, // ECU vs GER
	// Group F
	31: { hs: 2, as: 2 }, // NED vs JPN
	36: { hs: 1, as: 0 }, // SWE vs TUN
	32: { hs: 1, as: 0 }, // NED vs SWE
	34: { as: 0, hs: 2 }, // TUN vs JPN
	35: { hs: 2, as: 1 }, // JPN vs SWE
	33: { as: 1, hs: 3 }, // TUN vs NED
	// Group G
	37: { hs: 1, as: 1 }, // BEL vs EGY
	42: { hs: 1, as: 0 }, // IRN vs NZL
	38: { hs: 0, as: 0 }, // BEL vs IRN
	40: { as: 0, hs: 1 }, // NZL vs EGY
	39: { as: 0, hs: 1 }, // NZL vs BEL
	41: { hs: 1, as: 1 }, // EGY vs IRN
	// Group H
	43: { hs: 3, as: 0 }, // ESP vs CPV
	48: { hs: 0, as: 1 }, // KSA vs URY
	44: { hs: 2, as: 0 }, // ESP vs KSA
	46: { as: 3, hs: 0 }, // URY vs CPV
	47: { hs: 0, as: 1 }, // CPV vs KSA
	45: { as: 2, hs: 2 }, // URY vs ESP
	// Group I
	49: { hs: 3, as: 1 }, // FRA vs SEN
	54: { hs: 1, as: 1 }, // IRQ vs NOR
	50: { hs: 2, as: 0 }, // FRA vs IRQ
	52: { as: 1, hs: 1 }, // NOR VS SEN
	53: { hs: 1, as: 0 }, // SEN vs IRQ
	51: { as: 1, hs: 2 }, // NOR VS FRA
	// Group J
	55: { hs: 2, as: 0 }, // ARG vs ALG
	60: { hs: 1, as: 1 }, // AUT vs JOR
	56: { hs: 2, as: 0 }, // ARG vs AUT
	58: { as: 0, hs: 0 }, // JOR VS ALG
	59: { hs: 0, as: 0 }, // ALG vs AUT
	57: { as: 0, hs: 2 }, // JOR VS ARG
	// Group K
	61: { hs: 2, as: 0 }, // POR vs COD
	66: { hs: 0, as: 3 }, // UZB vs COL
	62: { hs: 2, as: 1 }, // POR vs UZB
	64: { as: 2, hs: 0 }, // COL vs COD
	65: { hs: 2, as: 2 }, // COD vs UZB
	63: { as: 2, hs: 1 }, // COL vs POR
	// Group L
	67: { hs: 2, as: 2 }, // ENG vs CRO
	72: { hs: 2, as: 0 }, // GHA vs PAN
	68: { hs: 2, as: 1 }, // ENG vs GHA
	70: { as: 0, hs: 2 }, // PAN vs CRO
	71: { hs: 2, as: 1 }, // CRO vs GHA
	69: { as: 0, hs: 3 }, // PAN vs ENG
}

export const CESAR_PREDICTIONS: Record<
	number,
	{ hs: number; as: number } | null
> = {
	// Group A 21 02 11 10 13 20
	1: { hs: 2, as: 1 }, // MEX vs RSA
	6: { hs: 0, as: 2 }, // KOR vs CZE
	4: { as: 1, hs: 1 }, // CZE vs RSA
	2: { hs: 1, as: 0 }, // MEX vs KOR
	5: { hs: 1, as: 3 }, // RSA vs KOR
	3: { as: 2, hs: 0 }, // CZE vs MEX
	// Group B 12 03 31 20 21 20
	7: { hs: 1, as: 2 }, // CAN vs BIH
	12: { hs: 0, as: 3 }, // QAT vs SUI
	10: { as: 3, hs: 1 }, // SUI vs BIH
	8: { hs: 2, as: 0 }, // CAN vs QAT
	11: { hs: 2, as: 1 }, // BIH vs QAT
	9: { as: 2, hs: 0 }, // SUI vs CAN
	// Group C 30 02 11 40 13 31
	13: { hs: 3, as: 0 }, // BRA vs MAR
	18: { hs: 0, as: 2 }, // HAI vs SCO
	16: { as: 1, hs: 1 }, // SCO vs MAR
	14: { hs: 4, as: 0 }, // BRA vs HAI
	15: { as: 1, hs: 3 }, // SCO vs BRA
	17: { hs: 3, as: 1 }, // MAR vs HAI
	// Group D 23 02 22 22 31 20
	19: { hs: 2, as: 3 }, // USA vs PAR
	24: { hs: 0, as: 2 }, // AUS vs TUR
	20: { hs: 2, as: 2 }, // USA vs AUS
	22: { as: 2, hs: 2 }, // TUR vs PAR
	23: { hs: 3, as: 1 }, // PAR vs AUS
	21: { as: 2, hs: 0 }, // TUR vs USA
	// Group E 50 32 31 30 13 22
	25: { hs: 5, as: 0 }, // GER vs CUW
	30: { hs: 3, as: 2 }, // CIV vs ECU
	26: { hs: 3, as: 1 }, // GER vs CIV
	28: { as: 3, hs: 0 }, // ECU vs CUW
	29: { hs: 1, as: 3 }, // CUW vs CIV
	27: { as: 2, hs: 2 }, // ECU vs GER
	// Group F 21 22 31 02 22 13
	31: { hs: 2, as: 1 }, // NED vs JPN
	36: { hs: 2, as: 2 }, // SWE vs TUN
	32: { hs: 3, as: 1 }, // NED vs SWE
	34: { as: 0, hs: 2 }, // TUN vs JPN
	35: { hs: 2, as: 2 }, // JPN vs SWE
	33: { as: 1, hs: 3 }, // TUN vs NED
	// Group G 31 20 32 22 13 22
	37: { hs: 3, as: 1 }, // BEL vs EGY
	42: { hs: 2, as: 0 }, // IRN vs NZL
	38: { hs: 3, as: 2 }, // BEL vs IRN
	40: { as: 2, hs: 2 }, // NZL vs EGY
	39: { as: 1, hs: 3 }, // NZL vs BEL
	41: { hs: 2, as: 2 }, // EGY vs IRN
	// Group H 31 23 30 20 12 23
	43: { hs: 3, as: 1 }, // ESP vs CPV
	48: { hs: 2, as: 3 }, // KSA vs URY
	44: { hs: 3, as: 0 }, // ESP vs KSA
	46: { as: 2, hs: 0 }, // URY vs CPV
	47: { hs: 1, as: 2 }, // CPV vs KSA
	45: { as: 2, hs: 3 }, // URY vs ESP
	// Group I 22 22 30 12 30 02
	49: { hs: 2, as: 2 }, // FRA vs SEN
	54: { hs: 2, as: 2 }, // IRQ vs NOR
	50: { hs: 3, as: 0 }, // FRA vs IRQ
	52: { as: 1, hs: 2 }, // NOR VS SEN
	53: { hs: 3, as: 0 }, // SEN vs IRQ
	51: { as: 0, hs: 2 }, // NOR VS FRA
	// Group J 21 20 20 12 22 03
	55: { hs: 2, as: 1 }, // ARG vs ALG
	60: { hs: 2, as: 0 }, // AUT vs JOR
	56: { hs: 2, as: 0 }, // ARG vs AUT
	58: { as: 1, hs: 2 }, // JOR VS ALG
	59: { hs: 2, as: 2 }, // ALG vs AUT
	57: { as: 0, hs: 3 }, // JOR VS ARG
	// Group K 31 02 20 31 23 22
	61: { hs: 3, as: 1 }, // POR vs COD
	66: { hs: 0, as: 2 }, // UZB vs COL
	62: { hs: 2, as: 0 }, // POR vs UZB
	64: { as: 3, hs: 1 }, // COL vs COD
	65: { hs: 2, as: 3 }, // COD vs UZB
	63: { as: 2, hs: 2 }, // COL vs POR
	// Group L 20 30 22 02 23 04
	67: { hs: 2, as: 0 }, // ENG vs CRO
	72: { hs: 3, as: 0 }, // GHA vs PAN
	68: { hs: 2, as: 2 }, // ENG vs GHA
	70: { as: 0, hs: 2 }, // PAN vs CRO
	71: { hs: 2, as: 3 }, // CRO vs GHA
	69: { as: 0, hs: 4 }, // PAN vs ENG
}

export const LUCAS_PREDICTIONS: Record<
	number,
	{ hs: number; as: number } | null
> = {
	// Group A
	1: { hs: 1, as: 1 }, // MEX vs RSA11
	6: { hs: 1, as: 1 }, // KOR vs CZE11
	4: { as: 0, hs: 1 }, // CZE vs RSA01
	2: { hs: 2, as: 1 }, // MEX vs KOR21
	5: { hs: 0, as: 0 }, // RSA vs KOR00
	3: { as: 0, hs: 2 }, // CZE vs MEX02
	// Group B
	7: { hs: 2, as: 1 }, // CAN vs BIH21
	12: { hs: 0, as: 2 }, // QAT vs SUI02
	10: { as: 2, hs: 0 }, // SUI vs BIH20
	8: { hs: 3, as: 0 }, // CAN vs QAT30
	11: { hs: 1, as: 1 }, // BIH vs QAT11
	9: { as: 3, hs: 1 }, // SUI vs CAN31
	// Group C`
	13: { hs: 3, as: 1 }, // BRA vs MAR31
	18: { hs: 0, as: 2 }, // HAI vs SCO02
	16: { as: 0, hs: 2 }, // SCO vs MAR02
	14: { hs: 4, as: 0 }, // BRA vs HAI40
	15: { as: 0, hs: 2 }, // SCO vs BRA02
	17: { hs: 3, as: 1 }, // MAR vs HAI31
	// Group D
	19: { hs: 2, as: 1 }, // USA vs PAR21
	24: { hs: 0, as: 2 }, // AUS vs TUR02
	20: { hs: 1, as: 1 }, // USA vs AUS11
	22: { as: 1, hs: 2 }, // TUR vs PAR12
	23: { hs: 2, as: 0 }, // PAR vs AUS20
	21: { as: 1, hs: 1 }, // TUR vs USA11
	// Group E
	25: { hs: 3, as: 0 }, // GER vs CUW30
	30: { hs: 2, as: 0 }, // CIV vs ECU20
	26: { hs: 2, as: 0 }, // GER vs CIV20
	28: { as: 2, hs: 0 }, // ECU vs CUW20
	29: { hs: 1, as: 2 }, // CUW vs CIV12
	27: { as: 1, hs: 3 }, // ECU vs GER13
	// Group F
	31: { hs: 2, as: 0 }, // NED vs JPN20
	36: { hs: 2, as: 0 }, // SWE vs TUN20
	32: { hs: 2, as: 1 }, // NED vs SWE21
	34: { as: 0, hs: 0 }, // TUN vs JPN00
	35: { hs: 2, as: 1 }, // JPN vs SWE21
	33: { as: 0, hs: 2 }, // TUN vs NED02
	// Group G
	37: { hs: 3, as: 0 }, // BEL vs EGY30
	42: { hs: 1, as: 0 }, // IRN vs NZL10
	38: { hs: 3, as: 1 }, // BEL vs IRN31
	40: { as: 1, hs: 1 }, // NZL vs EGY11
	39: { as: 0, hs: 2 }, // NZL vs BEL02
	41: { hs: 2, as: 0 }, // EGY vs IRN20
	// Group H
	43: { hs: 4, as: 0 }, // ESP vs CPV40
	48: { hs: 1, as: 2 }, // KSA vs URY12
	44: { hs: 2, as: 0 }, // ESP vs KSA20
	46: { as: 2, hs: 0 }, // URY vs CPV20
	47: { hs: 0, as: 2 }, // CPV vs KSA02
	45: { as: 1, hs: 3 }, // URY vs ESP13
	// Group I
	49: { hs: 3, as: 0 }, // FRA vs SEN30
	54: { hs: 1, as: 1 }, // IRQ vs NOR11
	50: { hs: 3, as: 0 }, // FRA vs IRQ30
	52: { as: 1, hs: 2 }, // NOR VS SEN12
	53: { hs: 2, as: 0 }, // SEN vs IRQ20
	51: { as: 0, hs: 3 }, // NOR VS FRA03
	// Group J
	55: { hs: 3, as: 0 }, // ARG vs ALG30
	60: { hs: 2, as: 0 }, // AUT vs JOR20
	56: { hs: 2, as: 0 }, // ARG vs AUT20
	58: { as: 1, hs: 2 }, // JOR VS ALG12
	59: { hs: 0, as: 2 }, // ALG vs AUT02
	57: { as: 1, hs: 3 }, // JOR VS ARG13
	// Group K
	61: { hs: 2, as: 1 }, // POR vs COD21
	66: { hs: 0, as: 3 }, // UZB vs COL03
	62: { hs: 2, as: 0 }, // POR vs UZB20
	64: { as: 3, hs: 0 }, // COL vs COD30
	65: { hs: 1, as: 1 }, // COD vs UZB11
	63: { as: 0, hs: 0 }, // COL vs POR00
	// Group L
	67: { hs: 2, as: 2 }, // ENG vs CRO22
	72: { hs: 1, as: 0 }, // GHA vs PAN10
	68: { hs: 3, as: 1 }, // ENG vs GHA31
	70: { as: 0, hs: 2 }, // PAN vs CRO02
	71: { hs: 2, as: 0 }, // CRO vs GHA20
	69: { as: 0, hs: 2 }, // PAN vs ENG02
}

export const ROMINA_PREDICTIONS: Record<
	number,
	{ hs: number; as: number } | null
> = {
	// Group A
	1: { hs: 2, as: 1 }, // MEX vs RSA21
	6: { hs: 1, as: 1 }, // KOR vs CZE11
	4: { as: 2, hs: 0 }, // CZE vs RSA20
	2: { hs: 2, as: 2 }, // MEX vs KOR22
	5: { hs: 0, as: 0 }, // RSA vs KOR00
	3: { as: 1, hs: 2 }, // CZE vs MEX12
	// Group B
	7: { hs: 0, as: 2 }, // CAN vs BIH02
	12: { hs: 0, as: 1 }, // QAT vs SUI01
	10: { as: 1, hs: 2 }, // SUI vs BIH12
	8: { hs: 0, as: 0 }, // CAN vs QAT00
	11: { hs: 2, as: 0 }, // BIH vs QAT20
	9: { as: 2, hs: 1 }, // SUI vs CAN21
	// Group C`
	13: { hs: 3, as: 2 }, // BRA vs MAR32
	18: { hs: 0, as: 1 }, // HAI vs SCO01
	16: { as: 2, hs: 1 }, // SCO vs MAR21
	14: { hs: 4, as: 0 }, // BRA vs HAI40
	15: { as: 1, hs: 2 }, // SCO vs BRA12
	17: { hs: 1, as: 0 }, // MAR vs HAI10
	// Group D
	19: { hs: 1, as: 2 }, // USA vs PAR12
	24: { hs: 1, as: 1 }, // AUS vs TUR11
	20: { hs: 0, as: 0 }, // USA vs AUS00
	22: { as: 1, hs: 2 }, // TUR vs PAR12
	23: { hs: 3, as: 0 }, // PAR vs AUS30
	21: { as: 0, hs: 1 }, // TUR vs USA01
	// Group E
	25: { hs: 3, as: 0 }, // GER vs CUW30
	30: { hs: 1, as: 2 }, // CIV vs ECU12
	26: { hs: 2, as: 1 }, // GER vs CIV21
	28: { as: 3, hs: 1 }, // ECU vs CUW31
	29: { hs: 0, as: 0 }, // CUW vs CIV00
	27: { as: 2, hs: 3 }, // ECU vs GER23
	// Group F
	31: { hs: 4, as: 1 }, // NED vs JPN41
	36: { hs: 2, as: 0 }, // SWE vs TUN20
	32: { hs: 2, as: 1 }, // NED vs SWE21
	34: { as: 0, hs: 0 }, // TUN vs JPN00
	35: { hs: 1, as: 2 }, // JPN vs SWE12
	33: { as: 1, hs: 3 }, // TUN vs NED13
	// Group G
	37: { hs: 3, as: 1 }, // BEL vs EGY31
	42: { hs: 0, as: 0 }, // IRN vs NZL00
	38: { hs: 2, as: 0 }, // BEL vs IRN20
	40: { as: 1, hs: 1 }, // NZL vs EGY11
	39: { as: 0, hs: 2 }, // NZL vs BEL02
	41: { hs: 0, as: 0 }, // EGY vs IRN00
	// Group H
	43: { hs: 4, as: 0 }, // ESP vs CPV40
	48: { hs: 1, as: 3 }, // KSA vs URY13
	44: { hs: 3, as: 0 }, // ESP vs KSA30
	46: { as: 3, hs: 0 }, // URY vs CPV30
	47: { hs: 0, as: 1 }, // CPV vs KSA01
	45: { as: 2, hs: 2 }, // URY vs ESP22
	// Group I
	49: { hs: 2, as: 1 }, // FRA vs SEN21
	54: { hs: 0, as: 2 }, // IRQ vs NOR02
	50: { hs: 3, as: 0 }, // FRA vs IRQ30
	52: { as: 2, hs: 1 }, // NOR VS SEN21
	53: { hs: 1, as: 1 }, // SEN vs IRQ11
	51: { as: 2, hs: 2 }, // NOR VS FRA22
	// Group J
	55: { hs: 2, as: 0 }, // ARG vs ALG20
	60: { hs: 1, as: 0 }, // AUT vs JOR10
	56: { hs: 3, as: 1 }, // ARG vs AUT31
	58: { as: 0, hs: 0 }, // JOR VS ALG00
	59: { hs: 1, as: 1 }, // ALG vs AUT11
	57: { as: 1, hs: 3 }, // JOR VS ARG13
	// Group K
	61: { hs: 3, as: 1 }, // POR vs COD31
	66: { hs: 1, as: 2 }, // UZB vs COL12
	62: { hs: 2, as: 0 }, // POR vs UZB20
	64: { as: 2, hs: 1 }, // COL vs COD21
	65: { hs: 2, as: 1 }, // COD vs UZB21
	63: { as: 3, hs: 2 }, // COL vs POR32
	// Group L
	67: { hs: 2, as: 2 }, // ENG vs CRO22
	72: { hs: 2, as: 0 }, // GHA vs PAN20
	68: { hs: 2, as: 1 }, // ENG vs GHA21
	70: { as: 0, hs: 3 }, // PAN vs CRO03
	71: { hs: 2, as: 1 }, // CRO vs GHA21
	69: { as: 0, hs: 3 }, // PAN vs ENG03
}

export const RODRIGO_PREDICTIONS: Record<
	number,
	{ hs: number; as: number } | null
> = {
	// Group A
	1: { hs: 2, as: 0 }, // MEX vs RSA20
	6: { hs: 1, as: 1 }, // KOR vs CZE11
	4: { as: 0, hs: 2 }, // CZE vs RSA02
	2: { hs: 1, as: 1 }, // MEX vs KOR11
	5: { hs: 1, as: 2 }, // RSA vs KOR12
	3: { as: 1, hs: 2 }, // CZE vs MEX12
	// Group B
	7: { hs: 2, as: 1 }, // CAN vs BIH21
	12: { hs: 1, as: 1 }, // QAT vs SUI11
	10: { as: 2, hs: 1 }, // SUI vs BIH21
	8: { hs: 2, as: 0 }, // CAN vs QAT20
	11: { hs: 2, as: 1 }, // BIH vs QAT21
	9: { as: 1, hs: 1 }, // SUI vs CAN11
	// Group C`
	13: { hs: 2, as: 1 }, // BRA vs MAR21
	18: { hs: 0, as: 2 }, // HAI vs SCO02
	16: { as: 1, hs: 2 }, // SCO vs MAR12
	14: { hs: 3, as: 0 }, // BRA vs HAI30
	15: { as: 0, hs: 2 }, // SCO vs BRA02
	17: { hs: 3, as: 1 }, // MAR vs HAI31
	// Group D
	19: { hs: 2, as: 1 }, // USA vs PAR21
	24: { hs: 1, as: 2 }, // AUS vs TUR12
	20: { hs: 2, as: 1 }, // USA vs AUS21
	22: { as: 1, hs: 1 }, // TUR vs PAR11
	23: { hs: 2, as: 0 }, // PAR vs AUS20
	21: { as: 1, hs: 1 }, // TUR vs USA11
	// Group E
	25: { hs: 3, as: 0 }, // GER vs CUW30
	30: { hs: 1, as: 1 }, // CIV vs ECU11
	26: { hs: 2, as: 1 }, // GER vs CIV21
	28: { as: 2, hs: 0 }, // ECU vs CUW20
	29: { hs: 1, as: 2 }, // CUW vs CIV12
	27: { as: 1, hs: 1 }, // ECU vs GER11
	// Group F
	31: { hs: 2, as: 1 }, // NED vs JPN21
	36: { hs: 2, as: 0 }, // SWE vs TUN20
	32: { hs: 2, as: 1 }, // NED vs SWE21
	34: { as: 1, hs: 1 }, // TUN vs JPN11
	35: { hs: 2, as: 1 }, // JPN vs SWE21
	33: { as: 0, hs: 2 }, // TUN vs NED02
	// Group G
	37: { hs: 2, as: 0 }, // BEL vs EGY20
	42: { hs: 2, as: 0 }, // IRN vs NZL20
	38: { hs: 2, as: 1 }, // BEL vs IRN21
	40: { as: 1, hs: 1 }, // NZL vs EGY11
	39: { as: 0, hs: 2 }, // NZL vs BEL02
	41: { hs: 1, as: 1 }, // EGY vs IRN11
	// Group H
	43: { hs: 3, as: 0 }, // ESP vs CPV30
	48: { hs: 1, as: 2 }, // KSA vs URY12
	44: { hs: 2, as: 0 }, // ESP vs KSA20
	46: { as: 2, hs: 0 }, // URY vs CPV20
	47: { hs: 1, as: 1 }, // CPV vs KSA11
	45: { as: 1, hs: 2 }, // URY vs ESP12
	// Group I
	49: { hs: 2, as: 1 }, // FRA vs SEN21
	54: { hs: 1, as: 2 }, // IRQ vs NOR12
	50: { hs: 3, as: 0 }, // FRA vs IRQ30
	52: { as: 1, hs: 1 }, // NOR VS SEN11
	53: { hs: 2, as: 0 }, // SEN vs IRQ20
	51: { as: 1, hs: 2 }, // NOR VS FRA12
	// Group J
	55: { hs: 3, as: 0 }, // ARG vs ALG30
	60: { hs: 2, as: 0 }, // AUT vs JOR20
	56: { hs: 2, as: 0 }, // ARG vs AUT20
	58: { as: 1, hs: 2 }, // JOR VS ALG12
	59: { hs: 1, as: 2 }, // ALG vs AUT12
	57: { as: 1, hs: 2 }, // JOR VS ARG12
	// Group K
	61: { hs: 3, as: 1 }, // POR vs COD31
	66: { hs: 1, as: 2 }, // UZB vs COL12
	62: { hs: 2, as: 0 }, // POR vs UZB20
	64: { as: 2, hs: 1 }, // COL vs COD21
	65: { hs: 2, as: 1 }, // COD vs UZB21
	63: { as: 1, hs: 1 }, // COL vs POR11
	// Group L
	67: { hs: 2, as: 1 }, // ENG vs CRO21
	72: { hs: 2, as: 0 }, // GHA vs PAN20
	68: { hs: 3, as: 1 }, // ENG vs GHA31
	70: { as: 0, hs: 2 }, // PAN vs CRO02
	71: { hs: 1, as: 1 }, // CRO vs GHA11
	69: { as: 0, hs: 2 }, // PAN vs ENG02
}

export const PREDICTIONS = { ...ADMIN_PREDICTIONS }
export type Predictions = typeof PREDICTIONS

export const PARTICIPANTES = [
	{ name: "Guillermo", results: GUILLERMO_PREDICTIONS },
	{ name: "Gustavo", results: GUSTAVO_PREDICTIONS },
	{ name: "Jonatan", results: JONATAN_PREDICTIONS },
	{ name: "Cesar", results: CESAR_PREDICTIONS },
	{ name: "Lucas", results: LUCAS_PREDICTIONS },
	{ name: "Rodrigo", results: RODRIGO_PREDICTIONS },
	{ name: "Romina", results: ROMINA_PREDICTIONS },
]
