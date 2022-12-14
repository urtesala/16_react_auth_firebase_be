/**
import { useState } from 'react';
 *
 * @param {object} whatToSend
 * @param {string} url
 * @returns [sendResult, error]
 */
export async function sendRequest(whatToSend, url) {
  try {
    // test url
    // console.log('url ===', url);
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(whatToSend),
    });
    if (!resp.ok) {
      throw await resp.json();
    }
    const result = await resp.json();
    // console.log('result ===', result);
    // viskas ivyko gerai
    return [result, null];
  } catch (error) {
    // console.warn('klaida sendRequest', error);
    return [null, error];
  }
  // issiusti su fetch post requesta ir paduoti i body duomenis is whatToSend
  // isspausdinti atsakykma
  // isspausdinti gauta idTokena
  // issiusti uzklausa su jau sukurtu email dar karta ir isspausdinti klaida.
}
export async function sendPatchRequest(url) {
  try {
    const resp = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ archived: true }),
    });
    if (!resp.ok) {
      throw await resp.json();
    }
    const result = await resp.json();
    // console.log('result ===', result);
    // viskas ivyko gerai
    return [result, null];
  } catch (error) {
    // console.warn('klaida sendRequest', error);
    return [null, error];
  }
  // issiusti su fetch post requesta ir paduoti i body duomenis is whatToSend
  // isspausdinti atsakykma
  // isspausdinti gauta idTokena
  // issiusti uzklausa su jau sukurtu email dar karta ir isspausdinti klaida.
}

function test() {
  // useState(); // neveikia, turi buti komponentas arba custom hook
}

/**
 * Transoms firebase objet of objects to array with id
 * @param {object} fireObj
 * @returns [{id, data}]
 */
export function fireObjToArr(fireObj) {
  const dataArr = [];
  for (const key in fireObj) {
    // su spred
    //dataArr.push({ id: key, ...fireObj[key] });
    // console.log('key ===', key);
    const value = fireObj[key];
    value.id = key;
    // console.log('value ===', value);
    dataArr.push(value);
  }
  console.log('dataArr ===', dataArr);
  return dataArr;
}
