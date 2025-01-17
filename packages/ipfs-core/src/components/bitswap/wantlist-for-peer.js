import PeerId from 'peer-id'
import { withTimeoutOption } from 'ipfs-core-utils/with-timeout-option'

/**
 * @param {Object} config
 * @param {import('../../types').NetworkService} config.network
 */
export function createWantlistForPeer ({ network }) {
  /**
   * @type {import('ipfs-core-types/src/bitswap').API["wantlistForPeer"]}
   */
  async function wantlistForPeer (peerId, options = {}) {
    const { bitswap } = await network.use(options)
    const list = bitswap.wantlistForPeer(PeerId.createFromB58String(peerId))

    return Array.from(list).map(e => e[1].cid)
  }

  return withTimeoutOption(wantlistForPeer)
}
