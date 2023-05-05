package com.example.demo.blockchainvoting.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.blockchainvoting.entity.BlockchainVotingSignupEntity;
import com.example.demo.blockchainvoting.service.BlockchainVotingSignupService;

@RestController
@RequestMapping("/signup")
@CrossOrigin("*")
public class BlockchainVotingSignupController {
	
	@Autowired
	private BlockchainVotingSignupService bvss;
	
	@GetMapping("/getdata")
	public List<BlockchainVotingSignupEntity> getDetails(){
		return bvss.getData();
	}
	
	@PostMapping("/savedata")
	public String saveDetails(@RequestBody BlockchainVotingSignupEntity se)
	{
		String email = se.getEmail(); 
		boolean check1 = bvss.existsByEmail(email);
		if(check1)
			return "email already exists";
		
		String voterId = se.getVoterid();
		boolean check2 = bvss.existsByVoterid(voterId);
		if(check2)
			return "voterId already exists";
		
		String walletaddress = se.getWalletaddress();
		boolean check3 = bvss.existsByWalletaddress(walletaddress);
		if(check3)
			return "wallet address already exists";
		
		bvss.saveData(se);
		return "signup success";
	}
	
	@GetMapping("/login")
	public String verifyLogin(@RequestBody BlockchainVotingSignupEntity se) {
		String email = se.getEmail();
		String password = se.getPassword();
		String wallet = se.getWalletaddress();
		boolean check = bvss.existsByEmailAndPasswordAndWalletaddress(email, password, wallet);
		BlockchainVotingSignupEntity bvse = bvss.findByEmail(email);
		boolean verified = bvse.isVerified();
		if(check && verified)
		{
			return "login success";
		}
		else
		{
			return "login failed";
		}
		
	}
	@PutMapping("/updatedata")
	public void updateDetails(@RequestBody BlockchainVotingSignupEntity bvse,@RequestParam int id)
	{
		bvse.setId(id);
		bvss.saveData(bvse);
	}
	
	@DeleteMapping("/deletedata")
	public void deleteDetails(@RequestParam int id)
	{
		bvss.deleteData(id);
	}
	
}
