import { generate } from 'generate-password-browser';

/**
 *
 * @param length - длина пароля
 * @param numbers
 * @param uppercase
 * @param lowercase
 * @param symbols
 * @param excludeSimilarCharacters
 * @param strict
 * @return {string}
 */
export default (
  length = 8,
  numbers = true,
  uppercase = true,
  lowercase = true,
  symbols = true,
  excludeSimilarCharacters = true,
  strict = true,
) => generate({
  length,
  numbers,
  uppercase,
  lowercase,
  symbols,
  excludeSimilarCharacters,
  strict,
});
