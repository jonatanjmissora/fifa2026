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
	1: { hs: 2, as: 0 }, // MEX vs RSA
	2: { hs: 3, as: 1 }, // MEX vs KOR
	3: { hs: 2, as: 0 }, // MEX vs CZE
	4: { hs: 1, as: 1 }, // RSA vs CZE
	5: { hs: 1, as: 2 }, // RSA vs KOR
	6: { hs: 1, as: 1 }, // KOR vs CZE
	// Group B
	7: { hs: 1, as: 0 }, // CAN vs BIH
	8: { hs: 2, as: 1 }, // CAN vs QAT
	9: { hs: 0, as: 2 }, // CAN vs SUI
	10: { hs: 0, as: 0 }, // BIH vs SUI
	11: { hs: 2, as: 0 }, // BIH vs QAT
	12: { hs: 1, as: 1 }, // QAT vs SUI
	// Group C
	13: { hs: 3, as: 0 }, // BRA vs MAR
	14: { hs: 4, as: 0 }, // BRA vs HAI
	15: { hs: 2, as: 0 }, // BRA vs SCO
	16: { hs: 1, as: 1 }, // MAR vs SCO
	17: { hs: 2, as: 0 }, // MAR vs HAI
	18: { hs: 0, as: 1 }, // HAI vs SCO
	// Group D
	19: { hs: 2, as: 0 }, // USA vs PAR
	20: { hs: 1, as: 1 }, // USA vs AUS
	21: { hs: 2, as: 0 }, // USA vs TUR
	22: { hs: 0, as: 2 }, // PAR vs TUR
	23: { hs: 2, as: 1 }, // PAR vs AUS
	24: { hs: 1, as: 2 }, // AUS vs TUR
	// Group E
	25: { hs: 4, as: 0 }, // GER vs CUW
	26: { hs: 2, as: 0 }, // GER vs CIV
	27: { hs: 3, as: 0 }, // GER vs ECU
	28: { hs: 1, as: 1 }, // CUW vs ECU
	29: { hs: 0, as: 2 }, // CUW vs CIV
	30: { hs: 2, as: 0 }, // CIV vs ECU
	// Group F
	31: { hs: 2, as: 0 }, // NED vs JPN
	32: { hs: 2, as: 1 }, // NED vs SWE
	33: { hs: 3, as: 0 }, // NED vs TUN
	34: { hs: 0, as: 1 }, // JPN vs TUN
	35: { hs: 1, as: 1 }, // JPN vs SWE
	36: { hs: 1, as: 0 }, // SWE vs TUN
	// Group G
	37: { hs: 2, as: 0 }, // BEL vs EGY
	38: { hs: 1, as: 1 }, // BEL vs IRN
	39: { hs: 3, as: 0 }, // BEL vs NZL
	40: { hs: 1, as: 0 }, // EGY vs NZL
	41: { hs: 2, as: 0 }, // EGY vs IRN
	42: { hs: 1, as: 1 }, // IRN vs NZL
	// Group H
	43: { hs: 3, as: 0 }, // ESP vs CPV
	44: { hs: 2, as: 0 }, // ESP vs KSA
	45: { hs: 1, as: 1 }, // ESP vs URY
	46: { hs: 0, as: 2 }, // CPV vs URY
	47: { hs: 1, as: 0 }, // CPV vs KSA
	48: { hs: 1, as: 2 }, // KSA vs URY
	// Group I
	49: { hs: 2, as: 0 }, // FRA vs SEN
	50: { hs: 3, as: 0 }, // FRA vs IRQ
	51: { hs: 1, as: 0 }, // FRA vs NOR
	52: { hs: 1, as: 1 }, // SEN vs NOR
	53: { hs: 2, as: 0 }, // SEN vs IRQ
	54: { hs: 0, as: 1 }, // IRQ vs NOR
	// Group J
	55: { hs: 2, as: 0 }, // ARG vs ALG
	56: { hs: 2, as: 0 }, // ARG vs AUT
	57: { hs: 3, as: 0 }, // ARG vs JOR
	58: { hs: 1, as: 0 }, // ALG vs JOR
	59: { hs: 1, as: 1 }, // ALG vs AUT
	60: { hs: 0, as: 2 }, // AUT vs JOR
	// Group K
	61: { hs: 2, as: 0 }, // POR vs COD
	62: { hs: 2, as: 0 }, // POR vs UZB
	63: { hs: 1, as: 1 }, // POR vs COL
	64: { hs: 1, as: 2 }, // COD vs COL
	65: { hs: 2, as: 0 }, // COD vs UZB
	66: { hs: 0, as: 2 }, // UZB vs COL
	// Group L
	67: { hs: 2, as: 0 }, // ENG vs CRO
	68: { hs: 2, as: 0 }, // ENG vs GHA
	69: { hs: 1, as: 0 }, // ENG vs PAN
	70: { hs: 1, as: 1 }, // CRO vs PAN
	71: { hs: 2, as: 0 }, // CRO vs GHA
	72: { hs: 0, as: 1 }, // GHA vs PAN
}

export const GUSTAVO_PREDICTIONS: Record<
	number,
	{ hs: number; as: number } | null
> = {
	// Group A
	1: { hs: 2, as: 0 }, // MEX vs RSA
	2: { hs: 3, as: 1 }, // MEX vs KOR
	3: { hs: 2, as: 0 }, // MEX vs CZE
	4: { hs: 1, as: 1 }, // RSA vs CZE
	5: { hs: 1, as: 2 }, // RSA vs KOR
	6: { hs: 1, as: 1 }, // KOR vs CZE
	// Group B
	7: { hs: 1, as: 0 }, // CAN vs BIH
	8: { hs: 2, as: 1 }, // CAN vs QAT
	9: { hs: 0, as: 2 }, // CAN vs SUI
	10: { hs: 0, as: 0 }, // BIH vs SUI
	11: { hs: 2, as: 0 }, // BIH vs QAT
	12: { hs: 1, as: 1 }, // QAT vs SUI
	// Group C
	13: { hs: 3, as: 0 }, // BRA vs MAR
	14: { hs: 4, as: 0 }, // BRA vs HAI
	15: { hs: 2, as: 0 }, // BRA vs SCO
	16: { hs: 1, as: 1 }, // MAR vs SCO
	17: { hs: 2, as: 0 }, // MAR vs HAI
	18: { hs: 0, as: 1 }, // HAI vs SCO
	// Group D
	19: { hs: 2, as: 0 }, // USA vs PAR
	20: { hs: 1, as: 1 }, // USA vs AUS
	21: { hs: 2, as: 0 }, // USA vs TUR
	22: { hs: 0, as: 2 }, // PAR vs TUR
	23: { hs: 2, as: 1 }, // PAR vs AUS
	24: { hs: 1, as: 2 }, // AUS vs TUR
	// Group E
	25: { hs: 4, as: 0 }, // GER vs CUW
	26: { hs: 2, as: 0 }, // GER vs CIV
	27: { hs: 3, as: 0 }, // GER vs ECU
	28: { hs: 1, as: 1 }, // CUW vs ECU
	29: { hs: 0, as: 2 }, // CUW vs CIV
	30: { hs: 2, as: 0 }, // CIV vs ECU
	// Group F
	31: { hs: 2, as: 0 }, // NED vs JPN
	32: { hs: 2, as: 1 }, // NED vs SWE
	33: { hs: 3, as: 0 }, // NED vs TUN
	34: { hs: 0, as: 1 }, // JPN vs TUN
	35: { hs: 1, as: 1 }, // JPN vs SWE
	36: { hs: 1, as: 0 }, // SWE vs TUN
	// Group G
	37: { hs: 2, as: 0 }, // BEL vs EGY
	38: { hs: 1, as: 1 }, // BEL vs IRN
	39: { hs: 3, as: 0 }, // BEL vs NZL
	40: { hs: 1, as: 0 }, // EGY vs NZL
	41: { hs: 2, as: 0 }, // EGY vs IRN
	42: { hs: 1, as: 1 }, // IRN vs NZL
	// Group H
	43: { hs: 3, as: 0 }, // ESP vs CPV
	44: { hs: 2, as: 0 }, // ESP vs KSA
	45: { hs: 1, as: 1 }, // ESP vs URY
	46: { hs: 0, as: 2 }, // CPV vs URY
	47: { hs: 1, as: 0 }, // CPV vs KSA
	48: { hs: 1, as: 2 }, // KSA vs URY
	// Group I
	49: { hs: 2, as: 0 }, // FRA vs SEN
	50: { hs: 3, as: 0 }, // FRA vs IRQ
	51: { hs: 1, as: 0 }, // FRA vs NOR
	52: { hs: 1, as: 1 }, // SEN vs NOR
	53: { hs: 2, as: 0 }, // SEN vs IRQ
	54: { hs: 0, as: 1 }, // IRQ vs NOR
	// Group J
	55: { hs: 2, as: 0 }, // ARG vs ALG
	56: { hs: 2, as: 0 }, // ARG vs AUT
	57: { hs: 3, as: 0 }, // ARG vs JOR
	58: { hs: 1, as: 0 }, // ALG vs JOR
	59: { hs: 1, as: 1 }, // ALG vs AUT
	60: { hs: 0, as: 2 }, // AUT vs JOR
	// Group K
	61: { hs: 2, as: 0 }, // POR vs COD
	62: { hs: 2, as: 0 }, // POR vs UZB
	63: { hs: 1, as: 1 }, // POR vs COL
	64: { hs: 1, as: 2 }, // COD vs COL
	65: { hs: 2, as: 0 }, // COD vs UZB
	66: { hs: 0, as: 2 }, // UZB vs COL
	// Group L
	67: { hs: 2, as: 0 }, // ENG vs CRO
	68: { hs: 2, as: 0 }, // ENG vs GHA
	69: { hs: 1, as: 0 }, // ENG vs PAN
	70: { hs: 1, as: 1 }, // CRO vs PAN
	71: { hs: 2, as: 0 }, // CRO vs GHA
	72: { hs: 0, as: 1 }, // GHA vs PAN
}

export const JONATAN_PREDICTIONS: Record<
	number,
	{ hs: number; as: number } | null
> = {
	// Group A
	1: { hs: 2, as: 0 }, // MEX vs RSA
	2: { hs: 3, as: 1 }, // MEX vs KOR
	3: { hs: 2, as: 0 }, // MEX vs CZE
	4: { hs: 1, as: 1 }, // RSA vs CZE
	5: { hs: 1, as: 2 }, // RSA vs KOR
	6: { hs: 1, as: 1 }, // KOR vs CZE
	// Group B
	7: { hs: 1, as: 0 }, // CAN vs BIH
	8: { hs: 2, as: 1 }, // CAN vs QAT
	9: { hs: 0, as: 2 }, // CAN vs SUI
	10: { hs: 0, as: 0 }, // BIH vs SUI
	11: { hs: 2, as: 0 }, // BIH vs QAT
	12: { hs: 1, as: 1 }, // QAT vs SUI
	// Group C
	13: { hs: 3, as: 0 }, // BRA vs MAR
	14: { hs: 4, as: 0 }, // BRA vs HAI
	15: { hs: 2, as: 0 }, // BRA vs SCO
	16: { hs: 1, as: 1 }, // MAR vs SCO
	17: { hs: 2, as: 0 }, // MAR vs HAI
	18: { hs: 0, as: 1 }, // HAI vs SCO
	// Group D
	19: { hs: 2, as: 0 }, // USA vs PAR
	20: { hs: 1, as: 1 }, // USA vs AUS
	21: { hs: 2, as: 0 }, // USA vs TUR
	22: { hs: 0, as: 2 }, // PAR vs TUR
	23: { hs: 2, as: 1 }, // PAR vs AUS
	24: { hs: 1, as: 2 }, // AUS vs TUR
	// Group E
	25: { hs: 4, as: 0 }, // GER vs CUW
	26: { hs: 2, as: 0 }, // GER vs CIV
	27: { hs: 3, as: 0 }, // GER vs ECU
	28: { hs: 1, as: 1 }, // CUW vs ECU
	29: { hs: 0, as: 2 }, // CUW vs CIV
	30: { hs: 2, as: 0 }, // CIV vs ECU
	// Group F
	31: { hs: 2, as: 0 }, // NED vs JPN
	32: { hs: 2, as: 1 }, // NED vs SWE
	33: { hs: 3, as: 0 }, // NED vs TUN
	34: { hs: 0, as: 1 }, // JPN vs TUN
	35: { hs: 1, as: 1 }, // JPN vs SWE
	36: { hs: 1, as: 0 }, // SWE vs TUN
	// Group G
	37: { hs: 2, as: 0 }, // BEL vs EGY
	38: { hs: 1, as: 1 }, // BEL vs IRN
	39: { hs: 3, as: 0 }, // BEL vs NZL
	40: { hs: 1, as: 0 }, // EGY vs NZL
	41: { hs: 2, as: 0 }, // EGY vs IRN
	42: { hs: 1, as: 1 }, // IRN vs NZL
	// Group H
	43: { hs: 3, as: 0 }, // ESP vs CPV
	44: { hs: 2, as: 0 }, // ESP vs KSA
	45: { hs: 1, as: 1 }, // ESP vs URY
	46: { hs: 0, as: 2 }, // CPV vs URY
	47: { hs: 1, as: 0 }, // CPV vs KSA
	48: { hs: 1, as: 2 }, // KSA vs URY
	// Group I
	49: { hs: 2, as: 0 }, // FRA vs SEN
	50: { hs: 3, as: 0 }, // FRA vs IRQ
	51: { hs: 1, as: 0 }, // FRA vs NOR
	52: { hs: 1, as: 1 }, // SEN vs NOR
	53: { hs: 2, as: 0 }, // SEN vs IRQ
	54: { hs: 0, as: 1 }, // IRQ vs NOR
	// Group J
	55: { hs: 2, as: 0 }, // ARG vs ALG
	56: { hs: 2, as: 0 }, // ARG vs AUT
	57: { hs: 3, as: 0 }, // ARG vs JOR
	58: { hs: 1, as: 0 }, // ALG vs JOR
	59: { hs: 1, as: 1 }, // ALG vs AUT
	60: { hs: 0, as: 2 }, // AUT vs JOR
	// Group K
	61: { hs: 2, as: 0 }, // POR vs COD
	62: { hs: 2, as: 0 }, // POR vs UZB
	63: { hs: 1, as: 1 }, // POR vs COL
	64: { hs: 1, as: 2 }, // COD vs COL
	65: { hs: 2, as: 0 }, // COD vs UZB
	66: { hs: 0, as: 2 }, // UZB vs COL
	// Group L
	67: { hs: 2, as: 0 }, // ENG vs CRO
	68: { hs: 2, as: 0 }, // ENG vs GHA
	69: { hs: 1, as: 0 }, // ENG vs PAN
	70: { hs: 1, as: 1 }, // CRO vs PAN
	71: { hs: 2, as: 0 }, // CRO vs GHA
	72: { hs: 0, as: 1 }, // GHA vs PAN
}

export const JUAN_PREDICTIONS: Record<
	number,
	{ hs: number; as: number } | null
> = {
	// Group A
	1: { hs: 2, as: 0 }, // MEX vs RSA
	2: { hs: 3, as: 1 }, // MEX vs KOR
	3: { hs: 2, as: 0 }, // MEX vs CZE
	4: { hs: 1, as: 1 }, // RSA vs CZE
	5: { hs: 1, as: 2 }, // RSA vs KOR
	6: { hs: 1, as: 1 }, // KOR vs CZE
	// Group B
	7: { hs: 1, as: 0 }, // CAN vs BIH
	8: { hs: 2, as: 1 }, // CAN vs QAT
	9: { hs: 0, as: 2 }, // CAN vs SUI
	10: { hs: 0, as: 0 }, // BIH vs SUI
	11: { hs: 2, as: 0 }, // BIH vs QAT
	12: { hs: 1, as: 1 }, // QAT vs SUI
	// Group C
	13: { hs: 3, as: 0 }, // BRA vs MAR
	14: { hs: 4, as: 0 }, // BRA vs HAI
	15: { hs: 2, as: 0 }, // BRA vs SCO
	16: { hs: 1, as: 1 }, // MAR vs SCO
	17: { hs: 2, as: 0 }, // MAR vs HAI
	18: { hs: 0, as: 1 }, // HAI vs SCO
	// Group D
	19: { hs: 2, as: 0 }, // USA vs PAR
	20: { hs: 1, as: 1 }, // USA vs AUS
	21: { hs: 2, as: 0 }, // USA vs TUR
	22: { hs: 0, as: 2 }, // PAR vs TUR
	23: { hs: 2, as: 1 }, // PAR vs AUS
	24: { hs: 1, as: 2 }, // AUS vs TUR
	// Group E
	25: { hs: 4, as: 0 }, // GER vs CUW
	26: { hs: 2, as: 0 }, // GER vs CIV
	27: { hs: 3, as: 0 }, // GER vs ECU
	28: { hs: 1, as: 1 }, // CUW vs ECU
	29: { hs: 0, as: 2 }, // CUW vs CIV
	30: { hs: 2, as: 0 }, // CIV vs ECU
	// Group F
	31: { hs: 2, as: 0 }, // NED vs JPN
	32: { hs: 2, as: 1 }, // NED vs SWE
	33: { hs: 3, as: 0 }, // NED vs TUN
	34: { hs: 0, as: 1 }, // JPN vs TUN
	35: { hs: 1, as: 1 }, // JPN vs SWE
	36: { hs: 1, as: 0 }, // SWE vs TUN
	// Group G
	37: { hs: 2, as: 0 }, // BEL vs EGY
	38: { hs: 1, as: 1 }, // BEL vs IRN
	39: { hs: 3, as: 0 }, // BEL vs NZL
	40: { hs: 1, as: 0 }, // EGY vs NZL
	41: { hs: 2, as: 0 }, // EGY vs IRN
	42: { hs: 1, as: 1 }, // IRN vs NZL
	// Group H
	43: { hs: 3, as: 0 }, // ESP vs CPV
	44: { hs: 2, as: 0 }, // ESP vs KSA
	45: { hs: 1, as: 1 }, // ESP vs URY
	46: { hs: 0, as: 2 }, // CPV vs URY
	47: { hs: 1, as: 0 }, // CPV vs KSA
	48: { hs: 1, as: 2 }, // KSA vs URY
	// Group I
	49: { hs: 2, as: 0 }, // FRA vs SEN
	50: { hs: 3, as: 0 }, // FRA vs IRQ
	51: { hs: 1, as: 0 }, // FRA vs NOR
	52: { hs: 1, as: 1 }, // SEN vs NOR
	53: { hs: 2, as: 0 }, // SEN vs IRQ
	54: { hs: 0, as: 1 }, // IRQ vs NOR
	// Group J
	55: { hs: 2, as: 0 }, // ARG vs ALG
	56: { hs: 2, as: 0 }, // ARG vs AUT
	57: { hs: 3, as: 0 }, // ARG vs JOR
	58: { hs: 1, as: 0 }, // ALG vs JOR
	59: { hs: 1, as: 1 }, // ALG vs AUT
	60: { hs: 0, as: 2 }, // AUT vs JOR
	// Group K
	61: { hs: 2, as: 0 }, // POR vs COD
	62: { hs: 2, as: 0 }, // POR vs UZB
	63: { hs: 1, as: 1 }, // POR vs COL
	64: { hs: 1, as: 2 }, // COD vs COL
	65: { hs: 2, as: 0 }, // COD vs UZB
	66: { hs: 0, as: 2 }, // UZB vs COL
	// Group L
	67: { hs: 2, as: 0 }, // ENG vs CRO
	68: { hs: 2, as: 0 }, // ENG vs GHA
	69: { hs: 1, as: 0 }, // ENG vs PAN
	70: { hs: 1, as: 1 }, // CRO vs PAN
	71: { hs: 2, as: 0 }, // CRO vs GHA
	72: { hs: 0, as: 1 }, // GHA vs PAN
}

export const LUCAS_PREDICTIONS: Record<
	number,
	{ hs: number; as: number } | null
> = {
	// Group A
	1: { hs: 2, as: 0 }, // MEX vs RSA
	2: { hs: 3, as: 1 }, // MEX vs KOR
	3: { hs: 2, as: 0 }, // MEX vs CZE
	4: { hs: 1, as: 1 }, // RSA vs CZE
	5: { hs: 1, as: 2 }, // RSA vs KOR
	6: { hs: 1, as: 1 }, // KOR vs CZE
	// Group B
	7: { hs: 1, as: 0 }, // CAN vs BIH
	8: { hs: 2, as: 1 }, // CAN vs QAT
	9: { hs: 0, as: 2 }, // CAN vs SUI
	10: { hs: 0, as: 0 }, // BIH vs SUI
	11: { hs: 2, as: 0 }, // BIH vs QAT
	12: { hs: 1, as: 1 }, // QAT vs SUI
	// Group C
	13: { hs: 3, as: 0 }, // BRA vs MAR
	14: { hs: 4, as: 0 }, // BRA vs HAI
	15: { hs: 2, as: 0 }, // BRA vs SCO
	16: { hs: 1, as: 1 }, // MAR vs SCO
	17: { hs: 2, as: 0 }, // MAR vs HAI
	18: { hs: 0, as: 1 }, // HAI vs SCO
	// Group D
	19: { hs: 2, as: 0 }, // USA vs PAR
	20: { hs: 1, as: 1 }, // USA vs AUS
	21: { hs: 2, as: 0 }, // USA vs TUR
	22: { hs: 0, as: 2 }, // PAR vs TUR
	23: { hs: 2, as: 1 }, // PAR vs AUS
	24: { hs: 1, as: 2 }, // AUS vs TUR
	// Group E
	25: { hs: 4, as: 0 }, // GER vs CUW
	26: { hs: 2, as: 0 }, // GER vs CIV
	27: { hs: 3, as: 0 }, // GER vs ECU
	28: { hs: 1, as: 1 }, // CUW vs ECU
	29: { hs: 0, as: 2 }, // CUW vs CIV
	30: { hs: 2, as: 0 }, // CIV vs ECU
	// Group F
	31: { hs: 2, as: 0 }, // NED vs JPN
	32: { hs: 2, as: 1 }, // NED vs SWE
	33: { hs: 3, as: 0 }, // NED vs TUN
	34: { hs: 0, as: 1 }, // JPN vs TUN
	35: { hs: 1, as: 1 }, // JPN vs SWE
	36: { hs: 1, as: 0 }, // SWE vs TUN
	// Group G
	37: { hs: 2, as: 0 }, // BEL vs EGY
	38: { hs: 1, as: 1 }, // BEL vs IRN
	39: { hs: 3, as: 0 }, // BEL vs NZL
	40: { hs: 1, as: 0 }, // EGY vs NZL
	41: { hs: 2, as: 0 }, // EGY vs IRN
	42: { hs: 1, as: 1 }, // IRN vs NZL
	// Group H
	43: { hs: 3, as: 0 }, // ESP vs CPV
	44: { hs: 2, as: 0 }, // ESP vs KSA
	45: { hs: 1, as: 1 }, // ESP vs URY
	46: { hs: 0, as: 2 }, // CPV vs URY
	47: { hs: 1, as: 0 }, // CPV vs KSA
	48: { hs: 1, as: 2 }, // KSA vs URY
	// Group I
	49: { hs: 2, as: 0 }, // FRA vs SEN
	50: { hs: 3, as: 0 }, // FRA vs IRQ
	51: { hs: 1, as: 0 }, // FRA vs NOR
	52: { hs: 1, as: 1 }, // SEN vs NOR
	53: { hs: 2, as: 0 }, // SEN vs IRQ
	54: { hs: 0, as: 1 }, // IRQ vs NOR
	// Group J
	55: { hs: 2, as: 0 }, // ARG vs ALG
	56: { hs: 2, as: 0 }, // ARG vs AUT
	57: { hs: 3, as: 0 }, // ARG vs JOR
	58: { hs: 1, as: 0 }, // ALG vs JOR
	59: { hs: 1, as: 1 }, // ALG vs AUT
	60: { hs: 0, as: 2 }, // AUT vs JOR
	// Group K
	61: { hs: 2, as: 0 }, // POR vs COD
	62: { hs: 2, as: 0 }, // POR vs UZB
	63: { hs: 1, as: 1 }, // POR vs COL
	64: { hs: 1, as: 2 }, // COD vs COL
	65: { hs: 2, as: 0 }, // COD vs UZB
	66: { hs: 0, as: 2 }, // UZB vs COL
	// Group L
	67: { hs: 2, as: 0 }, // ENG vs CRO
	68: { hs: 2, as: 0 }, // ENG vs GHA
	69: { hs: 1, as: 0 }, // ENG vs PAN
	70: { hs: 1, as: 1 }, // CRO vs PAN
	71: { hs: 2, as: 0 }, // CRO vs GHA
	72: { hs: 0, as: 1 }, // GHA vs PAN
}

export const RODRIGO_PREDICTIONS: Record<
	number,
	{ hs: number; as: number } | null
> = {
	// Group A
	1: { hs: 2, as: 0 }, // MEX vs RSA
	2: { hs: 3, as: 1 }, // MEX vs KOR
	3: { hs: 2, as: 0 }, // MEX vs CZE
	4: { hs: 1, as: 1 }, // RSA vs CZE
	5: { hs: 1, as: 2 }, // RSA vs KOR
	6: { hs: 1, as: 1 }, // KOR vs CZE
	// Group B
	7: { hs: 1, as: 0 }, // CAN vs BIH
	8: { hs: 2, as: 1 }, // CAN vs QAT
	9: { hs: 0, as: 2 }, // CAN vs SUI
	10: { hs: 0, as: 0 }, // BIH vs SUI
	11: { hs: 2, as: 0 }, // BIH vs QAT
	12: { hs: 1, as: 1 }, // QAT vs SUI
	// Group C
	13: { hs: 3, as: 0 }, // BRA vs MAR
	14: { hs: 4, as: 0 }, // BRA vs HAI
	15: { hs: 2, as: 0 }, // BRA vs SCO
	16: { hs: 1, as: 1 }, // MAR vs SCO
	17: { hs: 2, as: 0 }, // MAR vs HAI
	18: { hs: 0, as: 1 }, // HAI vs SCO
	// Group D
	19: { hs: 2, as: 0 }, // USA vs PAR
	20: { hs: 1, as: 1 }, // USA vs AUS
	21: { hs: 2, as: 0 }, // USA vs TUR
	22: { hs: 0, as: 2 }, // PAR vs TUR
	23: { hs: 2, as: 1 }, // PAR vs AUS
	24: { hs: 1, as: 2 }, // AUS vs TUR
	// Group E
	25: { hs: 4, as: 0 }, // GER vs CUW
	26: { hs: 2, as: 0 }, // GER vs CIV
	27: { hs: 3, as: 0 }, // GER vs ECU
	28: { hs: 1, as: 1 }, // CUW vs ECU
	29: { hs: 0, as: 2 }, // CUW vs CIV
	30: { hs: 2, as: 0 }, // CIV vs ECU
	// Group F
	31: { hs: 2, as: 0 }, // NED vs JPN
	32: { hs: 2, as: 1 }, // NED vs SWE
	33: { hs: 3, as: 0 }, // NED vs TUN
	34: { hs: 0, as: 1 }, // JPN vs TUN
	35: { hs: 1, as: 1 }, // JPN vs SWE
	36: { hs: 1, as: 0 }, // SWE vs TUN
	// Group G
	37: { hs: 2, as: 0 }, // BEL vs EGY
	38: { hs: 1, as: 1 }, // BEL vs IRN
	39: { hs: 3, as: 0 }, // BEL vs NZL
	40: { hs: 1, as: 0 }, // EGY vs NZL
	41: { hs: 2, as: 0 }, // EGY vs IRN
	42: { hs: 1, as: 1 }, // IRN vs NZL
	// Group H
	43: { hs: 3, as: 0 }, // ESP vs CPV
	44: { hs: 2, as: 0 }, // ESP vs KSA
	45: { hs: 1, as: 1 }, // ESP vs URY
	46: { hs: 0, as: 2 }, // CPV vs URY
	47: { hs: 1, as: 0 }, // CPV vs KSA
	48: { hs: 1, as: 2 }, // KSA vs URY
	// Group I
	49: { hs: 2, as: 0 }, // FRA vs SEN
	50: { hs: 3, as: 0 }, // FRA vs IRQ
	51: { hs: 1, as: 0 }, // FRA vs NOR
	52: { hs: 1, as: 1 }, // SEN vs NOR
	53: { hs: 2, as: 0 }, // SEN vs IRQ
	54: { hs: 0, as: 1 }, // IRQ vs NOR
	// Group J
	55: { hs: 2, as: 0 }, // ARG vs ALG
	56: { hs: 2, as: 0 }, // ARG vs AUT
	57: { hs: 3, as: 0 }, // ARG vs JOR
	58: { hs: 1, as: 0 }, // ALG vs JOR
	59: { hs: 1, as: 1 }, // ALG vs AUT
	60: { hs: 0, as: 2 }, // AUT vs JOR
	// Group K
	61: { hs: 2, as: 0 }, // POR vs COD
	62: { hs: 2, as: 0 }, // POR vs UZB
	63: { hs: 1, as: 1 }, // POR vs COL
	64: { hs: 1, as: 2 }, // COD vs COL
	65: { hs: 2, as: 0 }, // COD vs UZB
	66: { hs: 0, as: 2 }, // UZB vs COL
	// Group L
	67: { hs: 2, as: 0 }, // ENG vs CRO
	68: { hs: 2, as: 0 }, // ENG vs GHA
	69: { hs: 1, as: 0 }, // ENG vs PAN
	70: { hs: 1, as: 1 }, // CRO vs PAN
	71: { hs: 2, as: 0 }, // CRO vs GHA
	72: { hs: 0, as: 1 }, // GHA vs PAN
}

export const ROMINA_PREDICTIONS: Record<
	number,
	{ hs: number; as: number } | null
> = {
	// Group A
	1: { hs: 2, as: 0 }, // MEX vs RSA
	2: { hs: 3, as: 1 }, // MEX vs KOR
	3: { hs: 2, as: 0 }, // MEX vs CZE
	4: { hs: 1, as: 1 }, // RSA vs CZE
	5: { hs: 1, as: 2 }, // RSA vs KOR
	6: { hs: 1, as: 1 }, // KOR vs CZE
	// Group B
	7: { hs: 1, as: 0 }, // CAN vs BIH
	8: { hs: 2, as: 1 }, // CAN vs QAT
	9: { hs: 0, as: 2 }, // CAN vs SUI
	10: { hs: 0, as: 0 }, // BIH vs SUI
	11: { hs: 2, as: 0 }, // BIH vs QAT
	12: { hs: 1, as: 1 }, // QAT vs SUI
	// Group C
	13: { hs: 3, as: 0 }, // BRA vs MAR
	14: { hs: 4, as: 0 }, // BRA vs HAI
	15: { hs: 2, as: 0 }, // BRA vs SCO
	16: { hs: 1, as: 1 }, // MAR vs SCO
	17: { hs: 2, as: 0 }, // MAR vs HAI
	18: { hs: 0, as: 1 }, // HAI vs SCO
	// Group D
	19: { hs: 2, as: 0 }, // USA vs PAR
	20: { hs: 1, as: 1 }, // USA vs AUS
	21: { hs: 2, as: 0 }, // USA vs TUR
	22: { hs: 0, as: 2 }, // PAR vs TUR
	23: { hs: 2, as: 1 }, // PAR vs AUS
	24: { hs: 1, as: 2 }, // AUS vs TUR
	// Group E
	25: { hs: 4, as: 0 }, // GER vs CUW
	26: { hs: 2, as: 0 }, // GER vs CIV
	27: { hs: 3, as: 0 }, // GER vs ECU
	28: { hs: 1, as: 1 }, // CUW vs ECU
	29: { hs: 0, as: 2 }, // CUW vs CIV
	30: { hs: 2, as: 0 }, // CIV vs ECU
	// Group F
	31: { hs: 2, as: 0 }, // NED vs JPN
	32: { hs: 2, as: 1 }, // NED vs SWE
	33: { hs: 3, as: 0 }, // NED vs TUN
	34: { hs: 0, as: 1 }, // JPN vs TUN
	35: { hs: 1, as: 1 }, // JPN vs SWE
	36: { hs: 1, as: 0 }, // SWE vs TUN
	// Group G
	37: { hs: 2, as: 0 }, // BEL vs EGY
	38: { hs: 1, as: 1 }, // BEL vs IRN
	39: { hs: 3, as: 0 }, // BEL vs NZL
	40: { hs: 1, as: 0 }, // EGY vs NZL
	41: { hs: 2, as: 0 }, // EGY vs IRN
	42: { hs: 1, as: 1 }, // IRN vs NZL
	// Group H
	43: { hs: 3, as: 0 }, // ESP vs CPV
	44: { hs: 2, as: 0 }, // ESP vs KSA
	45: { hs: 1, as: 1 }, // ESP vs URY
	46: { hs: 0, as: 2 }, // CPV vs URY
	47: { hs: 1, as: 0 }, // CPV vs KSA
	48: { hs: 1, as: 2 }, // KSA vs URY
	// Group I
	49: { hs: 2, as: 0 }, // FRA vs SEN
	50: { hs: 3, as: 0 }, // FRA vs IRQ
	51: { hs: 1, as: 0 }, // FRA vs NOR
	52: { hs: 1, as: 1 }, // SEN vs NOR
	53: { hs: 2, as: 0 }, // SEN vs IRQ
	54: { hs: 0, as: 1 }, // IRQ vs NOR
	// Group J
	55: { hs: 2, as: 0 }, // ARG vs ALG
	56: { hs: 2, as: 0 }, // ARG vs AUT
	57: { hs: 3, as: 0 }, // ARG vs JOR
	58: { hs: 1, as: 0 }, // ALG vs JOR
	59: { hs: 1, as: 1 }, // ALG vs AUT
	60: { hs: 0, as: 2 }, // AUT vs JOR
	// Group K
	61: { hs: 2, as: 0 }, // POR vs COD
	62: { hs: 2, as: 0 }, // POR vs UZB
	63: { hs: 1, as: 1 }, // POR vs COL
	64: { hs: 1, as: 2 }, // COD vs COL
	65: { hs: 2, as: 0 }, // COD vs UZB
	66: { hs: 0, as: 2 }, // UZB vs COL
	// Group L
	67: { hs: 2, as: 0 }, // ENG vs CRO
	68: { hs: 2, as: 0 }, // ENG vs GHA
	69: { hs: 1, as: 0 }, // ENG vs PAN
	70: { hs: 1, as: 1 }, // CRO vs PAN
	71: { hs: 2, as: 0 }, // CRO vs GHA
	72: { hs: 0, as: 1 }, // GHA vs PAN
}

export const PREDICTIONS = { ...ADMIN_PREDICTIONS }
export type Predictions = typeof PREDICTIONS

export const PARTICIPANTES = [
	{ name: "Guillermo", results: GUILLERMO_PREDICTIONS },
	{ name: "Gustavo", results: GUSTAVO_PREDICTIONS },
	{ name: "Jonatan", results: JONATAN_PREDICTIONS },
	{ name: "Juan", results: JUAN_PREDICTIONS },
	{ name: "Lucas", results: LUCAS_PREDICTIONS },
	{ name: "Rodrigo", results: RODRIGO_PREDICTIONS },
	{ name: "Romina", results: ROMINA_PREDICTIONS },
]
