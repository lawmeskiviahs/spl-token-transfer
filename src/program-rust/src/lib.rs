use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program::invoke,
    // program_error::ProgramError,
    pubkey::Pubkey,
    system_instruction,
};

/// Define the type of state stored in accounts
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct GreetingAccount {
    pub counter: u32,
}

entrypoint!(process_instruction);

pub fn process_instruction(
    _program_id: &Pubkey,
    accounts: &[AccountInfo],
    _instruction_data: &[u8],
) -> ProgramResult {

    msg!("Hello World Rust program entrypoint");

    let acc_iter = &mut accounts.iter();
    let from_info = next_account_info(acc_iter)?;
    let to_info = next_account_info(acc_iter)?;
    let _system_proram = next_account_info(acc_iter)?;
    // let from_token_info = next_account_info(acc_iter)?;
    // let to_token_info = next_account_info(acc_iter)?;
    // let token_info = next_account_info(acc_iter)?;

    let amount = 10000000;

    invoke(
        &system_instruction::transfer(from_info.key, to_info.key, amount),
        &[from_info.clone(), to_info.clone()],
    )?;

    // let ix = spl_token::instruction::transfer(
    //     token_info.key,
    //     from_token_info.key,
    //     to_token_info.key,
    //     from_info.key,
    //     &[from_info.key],
    //     amount,
    // )?;
    // invoke(
    //     &ix,
    //     &[
    //         from_token_info.clone(),
    //         to_token_info.clone(),
    //         from_info.clone(),
    //         token_info.clone(),
    //     ],
    // )?;

    Ok(())
}

