package com.example.demo.blockchainvoting.repo;

import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.blockchainvoting.entity.BlockchainVotingSignupEntity;

@Repository
public interface BlockchainVotingSignupRepoInt extends JpaRepository<BlockchainVotingSignupEntity, Integer> {
	
	public boolean existsByEmail(String email);
	public boolean existsByVoterid(String voterid);
	public boolean existsByWalletaddress(String walletaddress);
	public boolean existsByEmailAndPasswordAndWalletaddress(String email,String password,String wallet);
	public BlockchainVotingSignupEntity findByEmail(String email);
}
