import {
  Keypair,
  Connection,
  PublicKey,
  TransactionInstruction,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import {createAssociatedTokenAccount, getAssociatedTokenAddress, TOKEN_PROGRAM_ID} from "@solana/spl-token"

import {getPayer, getRpcUrl} from './utils';
let connection: Connection;
let payer: Keypair;

export async function establishConnection(): Promise<void> {
  const rpcUrl = await getRpcUrl();
  connection = new Connection(rpcUrl, 'confirmed');
}

export async function establishPayer(): Promise<void> {
    payer = await getPayer();
  }

async function getOrCreateAssociatedTokenAccount(
  connection: Connection,
  mint: PublicKey,
  wallet: Keypair
):
Promise<PublicKey> {
  const associatedTokenAddress = await getAssociatedTokenAddress(mint, wallet.publicKey)
    if (await connection.getAccountInfo(associatedTokenAddress)) {
        return associatedTokenAddress
    }

    console.log("create associated token account for", wallet.publicKey.toBase58())
    return await createAssociatedTokenAccount(connection, wallet, mint , wallet.publicKey)
}

export async function sayHello(): Promise<void> {
  
  let programId = new PublicKey('UbYmbpmTewbV3BbYKQ5Cu9mLFMCPPdXZJU9LwPNpDVo');
  let from_token_account = new PublicKey('8QhuyEzMW6fuPjVXSpVr2d4Uneq5D9HKe38wS5zeDLoB');
  let to_token_account = new PublicKey('EiXe8j89L1eySAZvSX4vdeqXA3mm9gyqPD75ET5SX9Dz');
  
  const instruction = new TransactionInstruction({
    keys: [{pubkey: payer.publicKey, isSigner: true, isWritable: false},{pubkey: from_token_account, isSigner: false, isWritable: true},{pubkey: to_token_account, isSigner:false, isWritable: true},{pubkey: TOKEN_PROGRAM_ID, isSigner:false, isWritable: false}],
    programId,
    data: Buffer.alloc(0), 
  });
  // console.log('instruction:', instruction);
  const Transferres = await sendAndConfirmTransaction(
    connection,
    new Transaction().add(instruction),
    [payer],
  );
  console.log(Transferres);
}
