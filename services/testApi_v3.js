// FAIL to use financialmodelingprep module

import axios from 'axios';
import { FMP_API_SECRET } from '@env';
import financialmodelingprep from 'financialmodelingprep';

const testApi = require('financialmodelingprep')(FMP_API_SECRET);

export default testApi;
