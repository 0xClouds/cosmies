//SPDX-License-Identifier:MIT
pragma solidity ^0.8.20;
import {ERC721} from "@openzeppelin/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/token/ERC721/extensions/ERC721URIStorage.sol";
import {ERC721Burnable} from "@openzeppelin/token/ERC721/extensions/ERC721Burnable.sol";
import {Ownable} from "@openzeppelin/access/Ownable.sol";


contract COSMIES721 is ERC721, ERC721URIStorage, Ownable, ERC721Burnable {
    error AMOUNT_SENT_INSUFFICIENT();
    error MAX_AMOUNT_OF_COSMIES_MINTED();

    uint256 private _nextTokenId;
    string private baseURI;

    constructor() ERC721("COSMIES", "CSME") Ownable(msg.sender){}

    function setTokenUri(uint256 _tokenId, string memory _tokenURI) external onlyOwner() {
        _setTokenURI(_tokenId, _tokenURI);
    }

    function setBaseURI(string memory _baseTokenURI) external onlyOwner {
        baseURI = _baseTokenURI;
    }

    function _baseURI() internal view override returns(string memory){
        return baseURI;
    }

    function safeMint() public payable {
        if(msg.value < 0.05 ether){
            revert AMOUNT_SENT_INSUFFICIENT();
        }

        if(balanceOf(msg.sender) > 10){
            revert MAX_AMOUNT_OF_COSMIES_MINTED();
        }

        uint256 _tokenId = _nextTokenId++;
        _safeMint(msg.sender, _tokenId);
    }

    function burn(uint256 _tokenId) public override  onlyOwner() {
        _update(address(0), _tokenId, owner());
    }

    function withdraw() external onlyOwner{
        uint256 balance = address(this).balance;
        address owner = msg.sender;
        (bool s,) = owner.call{value: balance}("");
        require(s, "Failed to withdraw ether");
        }

        


    function tokenURI(
        uint256 _tokenId
    )
        public
        view
        virtual
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(_tokenId);
    }

    function supportsInterface(
        bytes4 _interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(_interfaceId);
    }
}
