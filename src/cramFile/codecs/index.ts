import { CramUnimplementedError } from '../../errors'

import HuffmanIntCodec from './huffman'
import ExternalCodec from './external'
import ByteArrayStopCodec from './byteArrayStop'
import ByteArrayLengthCodec from './byteArrayLength'
import BetaCodec from './beta'
import GammaCodec from './gamma'
import SubexpCodec from './subexp'
import CramCodec from './_base'
import { CramEncoding } from '../encoding'
import { DataType } from './dataSeriesTypes'

const codecClasses = {
  1: ExternalCodec,
  // 2: GolombCodec,
  3: HuffmanIntCodec,
  4: ByteArrayLengthCodec,
  5: ByteArrayStopCodec,
  6: BetaCodec,
  7: SubexpCodec,
  // 8: GolombRiceCodec,
  9: GammaCodec,
}

function getCodecClassWithId(id: number) {
  return (codecClasses as any)[id]
}

export function instantiateCodec<TResult extends DataType = DataType>(
  encodingData: CramEncoding,
  dataType: DataType | 'ignore',
): CramCodec<TResult> {
  const CodecClass = getCodecClassWithId(
    dataType === 'ignore' ? 0 : encodingData.codecId,
  )
  if (!CodecClass) {
    throw new CramUnimplementedError(
      `no codec implemented for codec ID ${encodingData.codecId}`,
    )
  }

  return new CodecClass(encodingData.parameters, dataType, instantiateCodec)
}
